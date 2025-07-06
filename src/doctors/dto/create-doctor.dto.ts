import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateDoctorDto{
    @ApiProperty({example:'John M'})
    @IsString()
    name:string;
   
    @ApiProperty({example:'51'})
    @IsNumber()
    age:number;
   
    @ApiProperty({example:'Male'})
    @IsString()
    gender:string;

    @ApiProperty({example:'Ortho'})
    @IsString()
    department:string;
   
    @ApiProperty({example:'9764321512'})
    @IsNumber()
    contactNumber:number;

}