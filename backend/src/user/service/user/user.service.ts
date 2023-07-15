import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/user/dto/CreateUser.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        let salt = await bcrypt.genSalt();
        createUserDTO.password = await bcrypt.hash(
            createUserDTO.password,
            salt,
        );

        if (await this.userRepository.countBy({
            username: createUserDTO.username
        }) > 0) {
            throw new ConflictException({
                message: 'Username is not available. Try a different one.'
            });
        }
        
        return this.userRepository.save(
            this.userRepository.create(createUserDTO),
        );
        
    }

    async deleteUser(userId: number): Promise<boolean> {
        let deletionResult = await this.userRepository.delete(userId);
        return deletionResult.affected == 1;
    }
}
