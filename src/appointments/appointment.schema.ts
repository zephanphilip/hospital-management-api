import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type AppointmentDocument = Document & Appointment

@Schema()
export class Appointment{
  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patientId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Doctor', required: true })
  doctorId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 'scheduled', enum: ['scheduled', 'completed', 'cancelled'] })
  status: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);