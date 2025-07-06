import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signUp.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import Roles from 'src/auth/roles.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Users') 
@ApiBearerAuth() 
@UseGuards(AuthGuard('jwt'),RolesGuard) 
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

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

    🧍 Patient does not require department.`
    })
    @Post('register')
    @Roles('admin')
    async register(@Body() signupdto:SignUpDto){
        return this.userService.create(signupdto);
    }

    @ApiOperation({ summary: 'Delete a patient or doctor by ID (Admin only)' })
    @Delete(':id')
    @Roles('admin')
    removePatient(@Param('id') id:string){
        return this.userService.removePatient(id)
    }

}
