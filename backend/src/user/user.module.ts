import { Module } from '@nestjs/common';
import { UserService } from './service/user/user.service';
import { UserController } from './controller/user/user.controller';
import { User } from 'src/typeorm/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nut } from 'src/typeorm/nut.entity';
import { NutService } from 'src/nut/service/nut/nut.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Nut])],
    providers: [UserService, NutService],
    controllers: [UserController],
})
export class UserModule {}
