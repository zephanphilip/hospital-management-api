import { IsEmail, IsIn, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class SignUpDto{
    @IsString()
    name:string;
    
    @IsEmail({},{message:"Please Enter Corect Email"})
    readonly email:string;

    @IsString()
    @MinLength(6)
    password:string;

    @IsIn(['admin','doctor','patient'])
    role:string;

    @IsOptional()
    @IsNumber()
    age:number;

    @IsOptional()
    @IsString()
    gender:string;
    
    @IsOptional()
    @IsNumber()
    contactNumber:number;
}