import { Controller, Post } from '@nestjs/common';

@Controller('nut')
export class NutController {
    @Post()
    postNut() {}
}
