import { Controller, Body, Get, Post, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/service/auth/auth.guard';
import { CreateUserDTO } from 'src/user/dto/CreateUser.dto';
import { DeleteUserDTO } from 'src/user/dto/DeleteUser.dto';
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

    @Delete()
    @UseGuards(AuthGuard)
    async deleteUser(@Body() deleteUserDto: DeleteUserDTO) {
        return this.userService.deleteUser(deleteUserDto.userId);
    }
}
