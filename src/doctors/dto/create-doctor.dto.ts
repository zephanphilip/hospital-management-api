import { IsEmail, IsIn, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateDoctorDto{
    @IsString()
    name:string;
   
    @IsNumber()
    age:number;
   
    @IsString()
    gender:string;

    @IsString()
    department:string;
   
    @IsNumber()
    contactNumber:number;

}