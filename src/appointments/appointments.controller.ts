import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { AppointmentsService } from './appointments.service';
import Roles from 'src/auth/roles.decorator';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller('appointments')
export class AppointmentsController {

    constructor(private readonly appointmentservices:AppointmentsService){}

    @Post()
    @Roles('patient')
    book(@Req() req: any,@Body() dto:CreateAppointmentDto){
        const userId = req.user.userId;
        return this.appointmentservices.bookAppointment(userId,dto)
    }

    @Get('me')
    @Roles('patient','doctor')
    findMyAppointment(@Req() req:any){
        return this.appointmentservices.findMyAppointment(req.user)
    }

    @Get('all')
    @Roles('admin')
    showAllAppointment(){
        return this.appointmentservices.showAllAppointment();
    }

    @Patch(':id')
    @Roles('doctor')
    updateStatus(@Param('id') id:string,@Body() dto:UpdateAppointmentDto){
        return this.appointmentservices.updateStatus(id,dto);
    }

}
