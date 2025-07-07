import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { PatientsService } from './patients.service';
import Roles from 'src/auth/roles.decorator';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { SpecialNoteDto } from './dto/specialnote.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Patients')
@ApiBearerAuth()
@Controller('patients')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PatientsController {
  constructor(private readonly patientServices: PatientsService) {}

  @ApiOperation({
    summary: 'Get profile of the logged-in patient (Patient only)',
    description: 'Returns profile details for the currently logged-in patient.',
  })
  @ApiResponse({
    status: 200,
    description: 'Patient profile retrieved successfully',
  })
  @Get('me')
  @Roles('patient')
  getMyProfile(@Req() req: any) {
    const userId = req.user.userId;
    return this.patientServices.getByUserId(userId);
  }

  @ApiOperation({
    summary: 'Update profile of the logged-in patient (Patient only)',
    description: 'Allows a patient to update their personal details.',
  })
  @ApiBody({
    type: UpdatePatientDto,
    examples: {
      updateExample: {
        summary: 'Update patient profile',
        value: {
          age: 25,
          gender: 'Female',
          contactNumber: '9876543210',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Patient profile updated successfully',
  })
  @Patch('me')
  @Roles('patient')
  updateMyProfile(@Body() dto: UpdatePatientDto, @Req() req: any) {
    const userId = req.user.userId;
    return this.patientServices.update(userId, dto);
  }

  @ApiOperation({
    summary: 'Get all patients (Admin/Doctor only)',
    description:
      'Returns a list of all registered patients. Restricted to doctors and admins.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all patients retrieved successfully',
  })
  @Get('all')
  @Roles('doctor', 'admin')
  getAll() {
    return this.patientServices.getAll();
  }

  @ApiOperation({
    summary: 'Get a specific patient by ID (Admin/Doctor only)',
    description: 'Allows a doctor or admin to view any patient profile by ID.(Use user ID of the Patient)',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the patient to retrieve',
    example: '64b1234567890abcdef12345',
  })
  @ApiResponse({
    status: 200,
    description: 'Patient profile retrieved successfully',
  })
  @Get(':id')
  @Roles('doctor', 'admin')
  findOne(@Param('id') id: string) {
    return this.patientServices.getByUserId(id);
  }

  @ApiTags('Doctors')
  @ApiOperation({
    summary: 'Add special note to a patient (Doctor only)',
    description:
      'Allows a doctor to add special medical notes to a patient record.',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'The ID of the patient to update',
    example: '64b1234567890abcdef12345',
  })
  @ApiBody({
    type: SpecialNoteDto,
    examples: {
      noteExample: {
        summary: 'Example: Add note',
        value: {
          specialNote: 'Patient has a history of high blood pressure. Monitor weekly.',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Special note added successfully' })
  @Patch(':id')
  @Roles('doctor')
  updatePatient(@Param('id') id: string, @Body() dto: SpecialNoteDto) {
    return this.patientServices.addSpecialNote(id, dto);
  }
}
