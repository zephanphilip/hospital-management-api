import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { PatientsService } from 'src/patients/patients.service';
import { Patient } from 'src/patients/patient.schema';
import { DoctorsService } from 'src/doctors/doctors.service';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private patientservices:PatientsService, private doctorservices:DoctorsService){}

    //register user as doctor or patient
    async create(signupdto:SignUpDto): Promise<User>{
        if(await this.userModel.findOne({email:signupdto.email})) throw new BadRequestException('Email already exists!');
        const hashed = await bcrypt.hash(signupdto.password,10);
        const user : UserDocument = await this.userModel.create({name:signupdto.name, email: signupdto.email, password:hashed, role: signupdto.role});
        
        if(user.role === 'patient'){
            await this.patientservices.create({
                name: signupdto.name,
                age: signupdto.age,
                gender: signupdto.gender,
                contactNumber: signupdto.contactNumber,
            },
        user._id.toString()
    )
        }
        if(user.role === 'doctor'){
            await this.doctorservices.create({
                name: signupdto.name,
                age: signupdto.age,
                gender: signupdto.gender,
                contactNumber: signupdto.contactNumber,
                department: signupdto.department
            },
        user._id.toString()
    )
        }
        return user
    }

    async findByEmailId(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({email});
    }

    //remove user
    async removeUser(id:string): Promise<any>{
        const user = await this.userModel.findById(id);
        if(!user)throw new NotFoundException('User does not Exist')

        if(user.role === 'doctor'){
            const doctor = await this.doctorservices.removeDoctorProfile(id)
            await this.userModel.findByIdAndDelete(id)
            return doctor
        }

        if(user.role === 'patient'){ const patient = await this.patientservices.removePatientDetail(id)
        await this.userModel.findByIdAndDelete(id)
        return patient
        }
    }
}

