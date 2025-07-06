import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsString, MinLength } from "class-validator";

export class LoginDto{

    @ApiProperty({ example: 'john@gmil.com' })
    @IsEmail()
    email:string;

    @ApiProperty({ example: 'Abcabc123!' })
    @IsString()
    password:string;
}