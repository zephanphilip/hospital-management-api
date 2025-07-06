import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { PatientsService } from 'src/patients/patients.service';
import { Patient } from 'src/patients/patient.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,private patientservices:PatientsService){}

    async create(signupdto:SignUpDto): Promise<User>{
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
        return user
    }

    async findByEmailId(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({email});
    }

    async removePatient(id:string): Promise<Patient>{
        const patient = await this.patientservices.removePatientDetail(id)
        await this.userModel.findByIdAndDelete(id)
        return patient
    }
}

