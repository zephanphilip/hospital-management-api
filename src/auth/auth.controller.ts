import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authservice:AuthService){}

    @ApiOperation({ summary: 'Login' })
    @Post('login')
    async login(@Body() logindto:LoginDto){
        const user = await this.authservice.validateUser(logindto.email, logindto.password);
        if(!user){
            throw new UnauthorizedException();
        }
        return this.authservice.login(user);
    }
}
