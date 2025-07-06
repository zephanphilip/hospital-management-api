import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpDto } from './dto/signUp.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import Roles from 'src/auth/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post('register')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('admin','doctor')
    async register(@Body() signupdto:SignUpDto){
        return this.userService.create(signupdto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'),RolesGuard)
    @Roles('admin')
    removePatient(@Param('id') id:string){
        return this.userService.removePatient(id)
    }
}
