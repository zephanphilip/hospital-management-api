import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';
import { Model } from 'mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
    constructor(@InjectModel(Doctor.name) private doctorModel:Model<DoctorDocument>){

    }

    //called by AuthService for auto create Doctor Profile
    async create(dto:CreateDoctorDto,userId:string):Promise<Doctor>{
        const existing = await this.doctorModel.findOne({userId:userId})

        if(existing) throw new Error('Doctor Profile Already Exist')

        return await this.doctorModel.create({...dto,userId})
    }


    async findAll():Promise<Doctor[]>{
        return await this.doctorModel.find().sort({createdAt: -1})
    }

    async findOne(userId:string):Promise<Doctor>{
        const existing=await this.doctorModel.findOne({userId})
        if(!existing) throw new NotFoundException('Doctor Profile Does not Exist')
        return existing
    }

    //used by doctor to update their own profile
    async update(userId:string, dto: UpdateDoctorDto): Promise<Doctor>{
            const doctor = await this.doctorModel.findOneAndUpdate({userId: userId.toString},dto,{new:true});
    
            if(!doctor) throw new NotFoundException('Doctor Not Found');
    
            return doctor;
    }

    async removeDoctorProfile(id:string):Promise<Doctor>{
        const doctor = await this.doctorModel.findOne({userId:id})
        if(!doctor) throw new NotFoundException('Doctor Profile not Found');
        await this.doctorModel.findOneAndDelete({userId:id})
        return doctor

    }
}
