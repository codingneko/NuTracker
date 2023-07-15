import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from 'src/auth/dto/LoginDTO.class';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import { LoginResponse } from 'src/utils/types';
import * as bcrypt from 'bcrypt';
import { constants } from 'src/constants';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    @Post('login')
    async login(loginDTO: LoginDTO): Promise<LoginResponse> {
        // TODO: Check if the user exists, generate a token for it and return it.
        let user: User = await this.userRepository.findOneBy({
            username: loginDTO.username,
        });

        if (user == null || !(await bcrypt.compare(loginDTO.password, user.password))) {
            throw new UnauthorizedException();
        }

        const payload = { userId: user.id, username: user.username };

        return {
            accessToken: this.jwtService.sign(payload, {
                secret: constants.jwt_token,
            }),
        };
    }
}
