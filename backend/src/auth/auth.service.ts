import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(user);
    try {
      await newUser.save();
      const { password, ...rest } = newUser.toObject();
      return rest;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create a new user');
    }
  }

  async validateUser(email: string, password: string): Promise<IUser | null> {
    try {
      const user = await this.userModel.findOne({ email }).exec();
      if (!user) {
        return null;
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return null;
      }
      const { password: _, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to validate user');
    }
  }

  async login(user: IUser): Promise<{ access_token: string }> {
    const payload = { email: user.email };
    try {
      const access_token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      });
      return { access_token };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Failed to generate secure access',
      );
    }
  }
}
