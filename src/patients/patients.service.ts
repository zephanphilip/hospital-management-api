import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Patient, PatientDocument } from './patient.schema';
import { Model, Types } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { SpecialNoteDto } from './dto/specialnote.dto';


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

        const patient = await this.patientModel.findOne({userId: userId.toString()});

        if (!patient) throw new NotFoundException('Patient profile not found');
        
        return patient
    }

    //used by patient to update their own profile
    async update(userId:string, dto: UpdatePatientDto): Promise<Patient>{
        const patient = await this.patientModel.findOneAndUpdate({userId: userId.toString()},dto,{new:true});

        if(!patient) throw new NotFoundException('Patient Not Found');

        return patient;
    }

        //add special note to doctor 
        async addSpecialNote(userId:string, specialNote:SpecialNoteDto): Promise<Patient>{
        const patient = await this.patientModel.findOneAndUpdate({userId: userId.toString()},{specialNote:specialNote.specialNote},{new:true});

        if(!patient) throw new NotFoundException('Patient Not Found');

        return patient;
    }

    //get all patients
    async getAll(): Promise<Patient[]>{
        const patients = await this.patientModel.find().sort({createdAt:-1})
        return patients
    }

    //remove patient used by user services
    async removePatientDetail(id:string): Promise<Patient>{
        const patient = await this.patientModel.findOne({userId:id})
        if(!patient) throw new NotFoundException('Patient Not Found');
        await this.patientModel.findByIdAndDelete(patient._id)
        return patient
    }

}
