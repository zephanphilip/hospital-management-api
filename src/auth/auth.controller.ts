import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from 'src/users/dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  @ApiOperation({
    summary: 'User Login',
    description: `Use this endpoint to log in using email and password. 
    On success, it returns a JWT token to be used in protected routes.`,
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      adminLogin: {
        summary: 'Admin login (for testing)',
        value: {
          email: 'admin@test.com',
          password: 'admin123',
        },
      },
      doctorLogin: {
        summary: 'Docotor login(for testing)',
        value: {
          email: 'doctor@test.com',
          password: 'doctor123',
        },
      },
      patientLogin: {
        summary: 'Patient login(for testing)',
        value: {
          email: 'patient@test.com',
          password: 'patient123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful. JWT token returned.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized. Invalid email or password.',
  })
  @Post('login')
  async login(@Body() logindto: LoginDto) {
    const user = await this.authservice.validateUser(
      logindto.email,
      logindto.password,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.authservice.login(user);
  }
}
