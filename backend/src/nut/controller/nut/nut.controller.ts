import { Body, Controller, Post } from '@nestjs/common';
import { CreateNutDTO } from 'src/nut/dto/create-nut.dto';
import { NutService } from 'src/nut/service/nut/nut.service';

@Controller('nut')
export class NutController {
    constructor(private nutService: NutService) {}

    @Post()
    async postNut(@Body() createNutDto: CreateNutDTO) {
        return await this.nutService.postNut(createNutDto);
    }
}
