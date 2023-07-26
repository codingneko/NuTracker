import { 
    Controller, 
    Body, 
    Get, 
    Post, 
    Delete, 
    UseGuards, 
    Param, 
    UseInterceptors, 
    UploadedFile,
    ParseFilePipe,
    FileTypeValidator,
    MaxFileSizeValidator
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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

    @Get()
    getUser(@Param() userId: number) {
        this.userService.getUser(userId);
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

    @Post(':id/avatar')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    uploadAvatar(
        @Param() params,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 200000,
                    }),
                    new FileTypeValidator({
                        fileType: 'image/*'
                    })
                ]
            })
        ) avatar: Express.Multer.File) {

        return this.userService.uploadAvatar(avatar, params.id);
    }
}
