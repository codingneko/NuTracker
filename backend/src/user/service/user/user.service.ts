import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import PrivateUserInfo from 'src/user/mode/PrivateUserInfo.interface';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    getUsersByNutCount(): Promise<User[]> {
        return this.userRepository.query(`
            SELECT 
                user.id, 
                username, 
                avatar, 
                count(nut.id) AS count, 
                AVG(nut.score) AS score 
            FROM user 
                LEFT JOIN nut 
                ON nut.userId = user.id 
            GROUP BY user.id 
            ORDER BY count 
            LIMIT 20;`);
    }

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUser(userId: number): Promise<User> {
        let user = await this.userRepository.findOneBy({
            id: userId,
        });

        if (user !== null) {
            return user;
        }

        return new User();
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        let salt = await bcrypt.genSalt();
        createUserDTO.password = await bcrypt.hash(
            createUserDTO.password,
            salt,
        );

        if (
            (await this.userRepository.countBy({
                username: createUserDTO.username,
            })) > 0
        ) {
            throw new ConflictException({
                message: 'Username is not available. Try a different one.',
            });
        }

        return this.userRepository.save(
            this.userRepository.create(createUserDTO),
        )[0];
    }

    async deleteUser(userId: number): Promise<boolean> {
        let deletionResult = await this.userRepository.delete(userId);
        return deletionResult.affected == 1;
    }

    async uploadAvatar(
        avatar: Express.Multer.File,
        userId: number,
    ): Promise<string> {
        console.log(avatar, userId);

        return '';
    }
}
