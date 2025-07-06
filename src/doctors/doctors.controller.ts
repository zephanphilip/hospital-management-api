import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { DoctorsService } from './doctors.service';
import Roles from 'src/auth/roles.decorator';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Doctors')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller('doctors')
export class DoctorsController {
    constructor(private readonly doctorservices:DoctorsService){}

    @ApiOperation({ summary: 'Get profile of the logged-in doctor' })
    @Get('me')
    @Roles('doctor')
    getMyProfile(@Req() req:any){
        const userId = req.user.userId;
        console.log('UserId:',userId)
        return this.doctorservices.findOne(userId)
    }

    @ApiOperation({ summary: 'Update profile of the logged-in doctor' })
    @Patch('me')
    @Roles('doctor')
    updateMyProfile(@Req() req:any,@Body() dto:UpdateDoctorDto){
        const userId = req.user.userId;
        return this.doctorservices.update(userId,dto)
    }

    @ApiOperation({ summary: 'Get list of all registered doctors (admin only)' })
    @Get('all')
    @Roles('admin')
    getAllDoc(){
        return this.doctorservices.findAll()
    }

    @ApiOperation({ summary: 'Get details of a specific doctor by ID (admin only)' })
    @Get(':id')
    @Roles('admin')
    getOneDoc(@Param('id') id:string){
        return this.doctorservices.findOne(id)
    }

    }
