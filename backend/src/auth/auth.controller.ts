import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
  Request,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() userDto: CreateUserDto,
  ): Promise<{ message: string; user: IUser }> {
    try {
      const user = await this.authService.signUp(userDto);
      return { message: 'User successfully registered', user: user };
    } catch (error) {
      throw new BadRequestException(`Registration failed: ${error.message}`);
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException(
        'User not found or authentication failed',
      );
    }
    const jwtToken = await this.authService.login(req.user);
    return { user: req.user, token: jwtToken };
  }
}
