import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nut } from 'src/typeorm/nut.entity';
import { NutController } from './controller/nut/nut.controller';
import { NutService } from './service/nut/nut.service';
import { User } from 'src/typeorm/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Nut, User])],
    providers: [NutService],
    controllers: [NutController],
})
export class NutModule {}
