import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), AuthModule],
  controllers: [AuthController],
})
export class AppModule {}
