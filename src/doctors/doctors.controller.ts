import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { DoctorsService } from './doctors.service';
import Roles from 'src/auth/roles.decorator';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Doctors')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorservices: DoctorsService) {}

  @ApiOperation({
    summary: 'Get profile of the logged-in doctor (Doctor only)',
    description: 'Returns profile details of the currently logged-in doctor.',
  })
  @ApiResponse({
    status: 200,
    description: 'Doctor profile retrieved successfully',
  })
  @Get('me')
  @Roles('doctor')
  getMyProfile(@Req() req: any) {
    const userId = req.user.userId;
    console.log('UserId:', userId);
    return this.doctorservices.findOne(userId);
  }

  @ApiOperation({
    summary: 'Update profile of the logged-in doctor (Doctor only)',
    description:
      'Allows a doctor to update their personal or professional information.',
  })
  @ApiBody({
    type: UpdateDoctorDto,
    examples: {
      updateDoctorExample: {
        summary: 'Update doctor profile',
        value: {
          contactNumber: '9876543210',
          department: 'Neurology',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Doctor profile updated successfully',
  })
  @Patch('me')
  @Roles('doctor')
  updateMyProfile(@Req() req: any, @Body() dto: UpdateDoctorDto) {
    const userId = req.user.userId;
    return this.doctorservices.update(userId, dto);
  }

  @ApiOperation({
    summary: 'Get list of all registered doctors (Admin only)',
    description: 'Returns all doctors in the system. Accessible only by Admin.',
  })
  @ApiResponse({
    status: 200,
    description: 'All doctors retrieved successfully',
  })
  @Get('all')
  @Roles('admin')
  getAllDoc() {
    return this.doctorservices.findAll();
  }

  @ApiOperation({
    summary: 'Get details of a specific doctor by ID (Admin only)',
    description:
      'Returns the profile of a doctor based on their ID. Accessible only by Admin.',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The ID of the doctor',
    example: '64b1234567890abcdef12345',
  })
  @Get(':id')
  @Roles('admin')
  getOneDoc(@Param('id') id: string) {
    return this.doctorservices.findOne(id);
  }
}
