import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private authservice:AuthService){}

    @Post('login')
    async login(@Body() logindto:LoginDto){
        const user = await this.authservice.validateUser(logindto.email, logindto.password);
        if(!user){
            throw new UnauthorizedException();
        }
        return this.authservice.login(user);
    }
}
