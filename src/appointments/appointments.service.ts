import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { Model, Types } from 'mongoose';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Patient, PatientDocument } from 'src/patients/patient.schema';
import { Doctor, DoctorDocument } from 'src/doctors/doctor.schema';

@Injectable()
export class AppointmentsService {
    constructor(@InjectModel(Appointment.name) private appointmentModel:Model<AppointmentDocument>, @InjectModel(Doctor.name) private doctorModel:Model<DoctorDocument>, @InjectModel(Patient.name) private patientmodel:Model<PatientDocument>){}

    async bookAppointment(patientId:string,dto: CreateAppointmentDto):Promise<Appointment>{
        const patient = await this.patientmodel.findOne({userId:patientId.toString()})
        if (!patient) throw new NotFoundException('Patient profile not found');
        return await this.appointmentModel.create({doctorId: new Types.ObjectId(dto.doctorId),date:dto.date,patientId:patient._id});
    }

    async findMyAppointment(user:any):Promise<any>{
        if(user.role === 'patient'){
            const patient = await this.patientmodel.findOne({userId:user.userId.toString()})
            if (!patient) throw new NotFoundException('Patient profile not found');
            return await this.appointmentModel.find({patientId:patient._id}).populate('doctorId')
        }
        if(user.role === 'doctor'){
            const doctor = await this.doctorModel.findOne({userId:user.userId.toString()})
            console.log('Doctor',doctor)
            if (!doctor) throw new NotFoundException('Doctor profile not found');
            return await this.appointmentModel.find({doctorId:doctor._id}).populate('patientId')
        }
    }

    async showAllAppointment():Promise<Appointment[]>{
        return await this.appointmentModel.find().sort({createdAt:-1})
    }

    async updateStatus(id:string, dto:UpdateAppointmentDto):Promise<Appointment>{
        const appointment = await this.appointmentModel.findByIdAndUpdate(id,dto,{new:true})
        if(!appointment)throw new NotFoundException('Appointment not found')
        return appointment
    }
}
