import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient, PatientDocument } from './patient.schema';
import { Model } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
    constructor(@InjectModel(Patient.name) private patientModel: Model<PatientDocument>){}

    //called by AuthService for auto create Patient Profile
    async create(dto:CreatePatientDto, userId:string):Promise<Patient>{
        const existing = await this.patientModel.findOne({userId});

        if(existing) throw new Error('Patent profile alreaddy exist');

        return this.patientModel.create({...dto, userId})
    }

    //used to fetch own profile using jwt
    async getByUserId(userId:string) : Promise<Patient>{
        const patient = await this.patientModel.findOne({userId});

        if (!patient) throw new NotFoundException('Patient profile not found');
        
        return patient
    }

    //used by patient to update their own profile
    async update(userId:string, dto: UpdatePatientDto): Promise<Patient>{
        const patient = await this.patientModel.findByIdAndUpdate({userId},dto,{new:true});

        if(!patient) throw new NotFoundException('Patient Not Found');

        return patient;
    }

}
