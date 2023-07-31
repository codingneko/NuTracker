import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNutDTO } from 'src/nut/dto/create-nut.dto';
import { Nut } from 'src/typeorm/nut.entity';
import { User } from 'src/typeorm/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NutService {
    constructor(@InjectRepository(Nut) private nutRepository: Repository<Nut>, @InjectRepository(User) private userRepository: Repository<User>) {}

    async postNut(createNutDTO: CreateNutDTO) {
        let user: User = await this.userRepository.findOneBy({
            id: createNutDTO.userId
        });

        return await this.nutRepository.save({
            date: createNutDTO.date,
            description: createNutDTO.description,
            score: createNutDTO.score,
            user: user
        });
    }

}
