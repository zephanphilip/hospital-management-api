import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointments/appointments.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
        useFactory:(configService: ConfigService)=>({
          uri: configService.get<string>('MONG_URI'),
        }),
      }),
    AuthModule,
    UsersModule,
    PatientsModule,
    DoctorsModule,
    AppointmentsModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
