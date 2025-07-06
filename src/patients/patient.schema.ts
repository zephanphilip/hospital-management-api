import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";


export type PatientDocument = Patient & Document;

@Schema()
export class Patient{
    @Prop({ type: Types.ObjectId, ref:'User', required:true, unique:true})
    userId: Types.ObjectId;

    @Prop({required:true})
    name:string;

    @Prop({required:true})
    age:number;

    @Prop({required:true})
    gender:string;

    @Prop({required:true})
    contactNumber:number;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);