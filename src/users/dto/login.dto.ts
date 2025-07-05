import { IsEmail, IsIn, IsString, MinLength } from "class-validator";

export class LoginDto{

    @IsEmail()
    email:string;

    @IsString()
    password:string;
}