import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import PrivateUserInfo from 'src/user/mode/PrivateUserInfo.interface';
import PublicUser from 'src/user/dto/public-user';
import { Nut } from 'src/typeorm/nut.entity';

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

    async getUser(userId: number): Promise<PublicUser> {
        let user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
            relations: {
                nuts: true,
            },
        });

        if (user === null) {
            throw new NotFoundException();
        }

        let publicUser: PublicUser = new PublicUser();
        publicUser.avatar = user.avatar;
        publicUser.id = user.id;
        publicUser.username = user.username;
        publicUser.nuts = user.nuts;

        return publicUser;
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
