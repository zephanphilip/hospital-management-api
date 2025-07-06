import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { PatientsModule } from 'src/patients/patients.module';
import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  imports:[
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    PatientsModule,
    DoctorsModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService,MongooseModule],
})
export class UsersModule {}
