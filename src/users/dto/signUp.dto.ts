import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class SignUpDto{
    @ApiProperty({ example: 'John M' })
    @IsString()
    name:string;
    
    @ApiProperty({ example: 'john@gmil.com' })
    @IsEmail({},{message:"Please Enter Corect Email"})
    readonly email:string;

    @ApiProperty({ example: 'Abcabc123!' })
    @IsString()
    @MinLength(6)
    password:string;

    @ApiProperty({ example: 'doctor' })
    @IsIn(['admin','doctor','patient'])
    role:string;

    @ApiPropertyOptional({example:'23'})
    @IsOptional()
    @IsNumber()
    age:number;

    @ApiPropertyOptional({example:'Male'})
    @IsOptional()
    @IsString()
    gender:string;
    
    @ApiPropertyOptional({example:'Ortho'})
    @IsOptional()
    @IsString()
    department:string;
    
    @ApiPropertyOptional({example:'985653223'})
    @IsOptional()
    @IsNumber()
    contactNumber:number;
}