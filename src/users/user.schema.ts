import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type UserDocument = User & Document;

export type Role = 'admin'| 'doctor' | 'patient';

@Schema({timestamps:true})
export class User{
    @Prop()
    name:string;

    @Prop({required:true, unique:[true,'mailID already exist']})
    email:string;

    @Prop({required:true})
    password:string;

    @Prop({required:true, enum:['doctor','patient','admin']})
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);