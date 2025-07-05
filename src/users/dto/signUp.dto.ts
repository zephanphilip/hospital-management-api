import { IsEmail, IsIn, IsString, MinLength } from "class-validator";

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
}