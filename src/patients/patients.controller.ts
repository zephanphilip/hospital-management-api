import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { PatientsService } from './patients.service';
import Roles from 'src/auth/roles.decorator';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
@UseGuards(AuthGuard('jwt'),RolesGuard)
export class PatientsController {
    constructor(private readonly patientServices:PatientsService){}

    @Get('me')
    @Roles('patient')
    getMyProfile(@Req() req: any){
        const userId = req.user.userId;
        return this.patientServices.getByUserId(userId)
    }

    @Patch('me')
    @Roles('patient')
    updateMyProfile(@Body() dto: UpdatePatientDto, @Req() req: any){
        const userId = req.user.userId;
        return this.patientServices.update(userId,dto);
    }
}
