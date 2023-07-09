import { Controller, Post, Body } from '@nestjs/common';
import { LoginDTO } from 'src/auth/dto/LoginDTO.class';
import { AuthService } from 'src/auth/service/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDTO: LoginDTO) {
        return await this.authService.login(loginDTO);
    }
}
