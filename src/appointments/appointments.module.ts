import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './appointment.schema';
import { Patient, PatientSchema } from 'src/patients/patient.schema';
import { Doctor, DoctorSchema } from 'src/doctors/doctor.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Appointment.name, schema:AppointmentSchema},
    {name:Patient.name,schema:PatientSchema},
    {name:Doctor.name,schema:DoctorSchema}
  ])
],
  providers: [AppointmentsService],
  controllers: [AppointmentsController]
})
export class AppointmentsModule {}
