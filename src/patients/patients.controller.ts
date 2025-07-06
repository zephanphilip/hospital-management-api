import { Body, Controller, Delete, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { PatientsService } from './patients.service';
import Roles from 'src/auth/roles.decorator';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { SpecialNoteDto } from './dto/specialnote.dto';

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

    @Get('all')
    @Roles('doctor','admin')
    getAll(){
        return this.patientServices.getAll()
    }

    @Get(':id')
    @Roles('doctor','admin')
    findOne(@Param('id') id:string){
        return this.patientServices.getByUserId(id)
    }

    //doctor can add special notes
    @Patch(':id')
    @Roles('doctor')
    updatePatient(@Param('id') id:string, @Body() dto:SpecialNoteDto){
        return this.patientServices.addSpecialNote(id,dto);
    }
}
