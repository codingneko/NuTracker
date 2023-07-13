import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/user/dto/CreateUser.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
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
}
