import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor{
    @Prop({ type: Types.ObjectId, ref:'User', required:true, unique:true})
    userId: Types.ObjectId;

    @Prop({required:true})
    name:string;

    @Prop({required:true})
    department:string;

    @Prop({required:true})
    gender:string;

    @Prop({required:true})
    contactNumber:number;

}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);