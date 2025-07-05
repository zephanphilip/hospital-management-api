import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
  PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory:(config: ConfigService)=>{
      return{
        secret: config.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn: config.get<string | number>('JWT_EXPIRES'),
        },
      };
    },
  }),
  UsersModule
],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
