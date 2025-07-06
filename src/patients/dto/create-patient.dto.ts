import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePatientDto{
    @ApiProperty({example:'John M'})
    @IsString()
    name:string;
   
    @ApiProperty({example:'45'})
    @IsNumber()
    age:number;
   
    @ApiProperty({example:'Male'})
    @IsString()
    gender:string;
   
    @ApiProperty({example:'7987654123'})
    @IsNumber()
    contactNumber:number;

}