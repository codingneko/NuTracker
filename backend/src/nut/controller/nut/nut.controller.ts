import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/service/auth/auth.guard';
import { CreateNutDTO } from 'src/nut/dto/create-nut.dto';
import { NutService } from 'src/nut/service/nut/nut.service';

@Controller('nut')
export class NutController {
    constructor(private nutService: NutService) {}

    @Post()
    @UseGuards(AuthGuard)
    async postNut(@Body() createNutDto: CreateNutDTO) {
        console.log(createNutDto);
        return await this.nutService.postNut(createNutDto);
    }

    @Get()
    async getNut() {
        return await this.nutService.getNut();
    }
}
