import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor( private userServices:UsersService, private jwtServices:JwtService){}

    async validateUser(email:string,password:string):Promise<any>{
        const user = await this.userServices.findByEmailId(email);

        if(!user) throw new NotFoundException("Email address not registered.");
        
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException("Invalid password.");
        }
        if(user && await bcrypt.compare(password,user.password)){
            const {password,...result} = user.toObject();
            return result;
        }

    }

    async login(user : any):Promise<{token: string}>{
        const payload = {email: user.email, sub: user._id, role:user.role}
        console.log('Payload:', payload);
        return{
            token: this.jwtServices.sign(payload),
        }
    }
}
