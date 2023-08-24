import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from '../schema/users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GoogleStrategy } from './google.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Users', schema: UsersSchema}]), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1d' },
  })],
  controllers: [UsersController],
  providers: [UsersService, GoogleStrategy]
})
export class UsersModule {}
