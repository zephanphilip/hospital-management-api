import { IsEmail, IsIn, IsNumber, IsString, MinLength } from "class-validator";

export class CreatePatientDto{
    @IsString()
    name:string;
   
    @IsNumber()
    age:number;
   
    @IsString()
    gender:string;
   
    @IsNumber()
    contactNumber:number;
}