import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private userservices: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: <string>process.env.JWT_SECRET,
        })
    }

    async validate(payload:any){
        const {email} = payload;
        console.log(payload)
        const user = await this.userservices.findByEmailId(email);

        if(!user){
            throw new UnauthorizedException('Login first to access this endpoint');
        }

        return user;
        
    }
}