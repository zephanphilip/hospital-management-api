import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { DoctorsService } from './doctors.service';
import Roles from 'src/auth/roles.decorator';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller('doctors')
export class DoctorsController {
    constructor(private readonly doctorservices:DoctorsService){}

    @Get('me')
    @Roles('doctor')
    getMyProfile(@Req() req:any){
        const userId = req.user.userId;
        console.log('UserId:',userId)
        return this.doctorservices.findOne(userId)
    }

    @Patch('me')
    @Roles('doctor')
    updateMyProfile(@Req() req:any,@Body() dto:UpdateDoctorDto){
        const userId = req.user.userId;
        return this.doctorservices.update(userId,dto)
    }

    @Get('all')
    @Roles('admin')
    getAllDoc(){
        return this.doctorservices.findAll()
    }

    @Get(':id')
    @Roles('admin')
    getOneDoc(@Param('id') id:string){
        return this.doctorservices.findOne(id)
    }

    }
