import { IsDateString, IsString } from "class-validator";

export class CreateAppointmentDto{
    @IsString()
    doctorId: string;

    @IsDateString()
    date: string;
}