import { Injectable, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from 'src/auth/dto/LoginDTO.class';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import { LoginResponse } from 'src/utils/types';
import * as bcrypt from 'bcrypt';
import { constants } from 'src/constants';
import PrivateUserInfo from 'src/user/mode/PrivateUserInfo.interface';
import Session from 'src/auth/models/session.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    @Post('login')
    async login(loginDTO: LoginDTO): Promise<LoginResponse> {
        let user: User = await this.userRepository.findOneBy({
            username: loginDTO.username,
        });

        if (user == null || !(await bcrypt.compare(loginDTO.password, user.password))) {
            throw new UnauthorizedException();
        }

        let expirationDate: Date = new Date();
        expirationDate = new Date(expirationDate.setMonth(expirationDate.getMonth() -3));

        const payload: Session = { 
            userId: user.id, 
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            expiryDate: expirationDate
        };

        return {
            accessToken: this.jwtService.sign(payload, {
                secret: constants.jwt_token,
            }),
        };
    }
}
