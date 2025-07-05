import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}

    async create(signupdto:SignUpDto): Promise<User>{
        const hashed = await bcrypt.hash(signupdto.password,10);
        const user = await this.userModel.create({name:signupdto.name, email: signupdto.email, password:hashed, role: signupdto.role});
        return user
    }

    async findByEmailId(email: string): Promise<UserDocument | null> {
        return await this.userModel.findOne({email});
    }
}

