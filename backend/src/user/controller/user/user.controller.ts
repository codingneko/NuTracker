import { Controller, Body, Get, Post, BadRequestException } from '@nestjs/common';
import { User } from 'src/typeorm/user.entity';
import { CreateUserDTO } from 'src/user/dto/CreateUser.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Post()
    async postUser(@Body() createUserDTO: CreateUserDTO) {
        return this.userService.createUser(createUserDTO);
    }
}
