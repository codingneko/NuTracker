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
    MaxFileSizeValidator,
    ParamData,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/service/auth/auth.guard';
import { NutService } from 'src/nut/service/nut/nut.service';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';
import { DeleteUserDTO } from 'src/user/dto/delete-user.dto';
import { UserService } from 'src/user/service/user/user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private nutService: NutService) {}

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Get()
    getUser(@Param() userId: number) {
        this.userService.getUser(userId);
    }

    @Get(':id/nuts')
    getUserNuts(@Param() params: any) {
        return this.nutService.getNut(params.id);
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
                        fileType: 'image/*',
                    }),
                ],
            }),
        )
        avatar: Express.Multer.File,
    ) {
        return this.userService.uploadAvatar(avatar, params.id);
    }
}
