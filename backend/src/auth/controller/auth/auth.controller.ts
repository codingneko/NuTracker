import { Controller, Post, Body, Res } from '@nestjs/common';
import { LoginDTO } from 'src/auth/dto/LoginDTO.class';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { Response } from 'express';
import { CreateUserDTO } from 'src/user/dto/CreateUser.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    @Post('login')
    async login(@Body() loginDTO: LoginDTO) {
        return await this.authService.login(loginDTO);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDTO) {
        return await this.userService.createUser(createUserDto);
    }
}
