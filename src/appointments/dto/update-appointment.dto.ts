import { ApiProperty } from "@nestjs/swagger";
import { IsIn } from "class-validator";

export class UpdateAppointmentDto{
    @ApiProperty({example:'completed'})
    @IsIn(['scheduled','completed','canceled'])
    status:string;
}