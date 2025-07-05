import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signUp.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post('register')
    async register(@Body() signupdto:SignUpDto){
        return this.userService.create(signupdto);
    }
}
