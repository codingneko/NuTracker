import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    createUser(createUserParams: CreateUserParams): Promise<User> {
        return this.userRepository.save(
            this.userRepository.create(createUserParams),
        );
    }
}
