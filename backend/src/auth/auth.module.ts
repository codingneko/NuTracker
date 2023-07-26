import { Module } from '@nestjs/common';
import { AuthService } from './service/auth/auth.service';
import { AuthController } from './controller/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/service/user/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService, JwtService, UserService],
    controllers: [AuthController],
})
export class AuthModule {}
