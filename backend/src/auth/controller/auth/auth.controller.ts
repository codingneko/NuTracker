import { Controller, Post, Body, Res, Req } from '@nestjs/common';
import { LoginDTO } from 'src/auth/dto/LoginDTO.class';
import { AuthService } from 'src/auth/service/auth/auth.service';
import { Response } from 'express';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ) {}

    @Post('login')
    async login(@Body() loginDTO: LoginDTO, @Res() response: Response) {
        let { accessToken } = await this.authService.login(loginDTO);
        response
            .cookie('JSESSIONID', accessToken, {
                secure: false,
                sameSite: 'lax',
                expires: new Date(Date.now() + 1000 * 60 * 24 * 31),
            })
            .send({
                accessToken,
            });
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDTO) {
        return await this.userService.createUser(createUserDto);
    }
}
