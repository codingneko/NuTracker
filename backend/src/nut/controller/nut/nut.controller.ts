import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateNutDTO } from 'src/nut/dto/create-nut.dto';
import { NutService } from 'src/nut/service/nut/nut.service';

@Controller('nut')
export class NutController {
    constructor(private nutService: NutService) {}

    @Post()
    async postNut(@Body() createNutDto: CreateNutDTO) {
        return await this.nutService.postNut(createNutDto);
    }

    @Get()
    async getNut() {
        return await this.nutService.getNut();
    }
}
