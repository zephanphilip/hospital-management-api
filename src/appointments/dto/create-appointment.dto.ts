import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsString } from "class-validator";

export class CreateAppointmentDto{
    @ApiProperty({example:'686a908fe820b90184fab8d6'})
    @IsString()
    doctorId: string;

    @ApiProperty({example:'2025-07-07T14:00:00'})
    @IsDateString()
    date: string;
}