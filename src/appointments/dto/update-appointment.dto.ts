import { IsIn } from "class-validator";

export class UpdateAppointmentDto{
    @IsIn(['scheduled','completed','canceled'])
    status:string;
}