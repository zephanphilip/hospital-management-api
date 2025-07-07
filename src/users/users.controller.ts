import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signUp.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import Roles from 'src/auth/roles.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({
    summary: 'Register a new user (accessible to Admin only)',
    description: `Use this endpoint to register a new user as either a doctor or a patient.

    ✳️ Common fields (for both):
    - name
    - age
    - gender
    - contactNumber
    - email
    - password

    🧑‍⚕️ Additional field for Doctor:
    - department

    🧍 Patient does not require department.`,
  })
  @ApiBody({
    type: SignUpDto,
    examples: {
      DoctorExample: {
        summary: 'Register a Doctor',
        value: {
          name: 'Test Doctor1',
          email: 'doctor1@test.com',
          password: 'doctor123',
          role: 'doctor',
          gender: 'Male',
          department: 'Orthopaedics',
          contactNumber: 7800000011,
        },
      },
      PatientExample: {
        summary: 'Register a Patient',
        value: {
          name: 'Test Patient1',
          email: 'patient1@test.com',
          password: 'patient123',
          role: 'patient',
          age: 20,
          gender: 'Male',
          contactNumber: 7000000001,
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({
    status: 401,
    description: 'UnAuthorized. Only Admin can register users.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only Admin can register users.',
  })
  @Post('register')
  @Roles('admin')
  async register(@Body() signupdto: SignUpDto) {
    return this.userService.create(signupdto);
  }

  @ApiOperation({ summary: 'Delete a patient or doctor by ID (Admin only)' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the user to delete',
    example: '64b1234567890abcdef12345',
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({
    status: 401,
    description: 'UnAuthorized. Only Admin can delete users.',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Only Admin can delete users.',
  })
  @Delete(':id')
  @Roles('admin')
  removePatient(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
