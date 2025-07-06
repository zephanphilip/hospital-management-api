import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { AppointmentsService } from './appointments.service';
import Roles from 'src/auth/roles.decorator';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Appointment')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Controller('appointments')
export class AppointmentsController {

    constructor(private readonly appointmentservices:AppointmentsService){}

    @ApiOperation({
    summary: 'Book an appointment (Patient only)',
    description: 'Patients can book an appointment by providing doctorId and date.',
    })
    @Post()
    @Roles('patient')
    book(@Req() req: any,@Body() dto:CreateAppointmentDto){
        const userId = req.user.userId;
        return this.appointmentservices.bookAppointment(userId,dto)
    }

    @ApiOperation({
    summary: 'View own appointments (Doctor or Patient)',
    description: 'Doctors can view appointments assigned to them. Patients can view their booked appointments.',
    })
    @Get('me')
    @Roles('patient','doctor')
    findMyAppointment(@Req() req:any){
        return this.appointmentservices.findMyAppointment(req.user)
    }

    @ApiOperation({
    summary: 'View all appointments (Admin only)',
    description: 'Admins can view all scheduled appointments in the system.',
    })
    @Get('all')
    @Roles('admin')
    showAllAppointment(){
        return this.appointmentservices.showAllAppointment();
    }
    
    @ApiOperation({
    summary: 'Update appointment status (Doctor only)',
    description: 'Doctors can update appointment status to completed, cancelled, etc.',
    })
    @Patch(':id')
    @Roles('doctor')
    updateStatus(@Param('id') id:string,@Body() dto:UpdateAppointmentDto){
        return this.appointmentservices.updateStatus(id,dto);
    }

}
