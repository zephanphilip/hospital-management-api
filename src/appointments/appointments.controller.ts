import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { AppointmentsService } from './appointments.service';
import Roles from 'src/auth/roles.decorator';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Appointment')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentservices: AppointmentsService) {}

  @ApiOperation({
    summary: 'Book an appointment (Patient only) (Use Doctor\'s _id)',
    description:
      'Patients can book an appointment by providing doctorId and date.',
  })
  @ApiBody({
    type: CreateAppointmentDto,
  })
  @ApiResponse({ status: 201, description: 'Appointment booked successfully' })
  @ApiResponse({
    status: 403,
    description: 'Only patients can book appointments',
  })
  @Post()
  @Roles('patient')
  book(@Req() req: any, @Body() dto: CreateAppointmentDto) {
    const userId = req.user.userId;
    return this.appointmentservices.bookAppointment(userId, dto);
  }

  @ApiOperation({
    summary: 'View own appointments (Doctor or Patient)',
    description:
      'Doctors can view appointments assigned to them. Patients can view their own appointments.',
  })
  @ApiResponse({
    status: 200,
    description: 'Appointments fetched successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Access denied for unauthorized roles',
  })
  @Get('me')
  @Roles('patient', 'doctor')
  findMyAppointment(@Req() req: any) {
    return this.appointmentservices.findMyAppointment(req.user);
  }

  @ApiOperation({
    summary: 'View all appointments (Admin only)',
    description: 'Admins can view all scheduled appointments in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'All appointments retrieved successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Only admins can access this route',
  })
  @Get('all')
  @Roles('admin')
  showAllAppointment() {
    return this.appointmentservices.showAllAppointment();
  }

  @ApiOperation({
    summary: 'Update appointment status (Doctor only)',
    description:
      'Allows a doctor to update appointment status (e.g., completed, cancelled).',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The appointment ID',
    example: '64b9876543210fedcba98765',
  })
  @ApiBody({
    type: UpdateAppointmentDto,
    examples: {
      statusExample: {
        summary: 'Mark appointment as completed',
        value: {
          status: 'completed',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Appointment status updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Only doctors can update appointment status',
  })
  @Patch(':id')
  @Roles('doctor')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateAppointmentDto) {
    return this.appointmentservices.updateStatus(id, dto);
  }
}
