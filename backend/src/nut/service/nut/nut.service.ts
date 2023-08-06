import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNutDTO } from 'src/nut/dto/create-nut.dto';
import { Nut } from 'src/typeorm/nut.entity';
import { User } from 'src/typeorm/user.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class NutService {
    constructor(
        @InjectRepository(Nut) private nutRepository: Repository<Nut>, 
        @InjectRepository(User) private userRepository: Repository<User>,
        private dataSource: DataSource) {}

    async postNut(createNutDTO: CreateNutDTO) {
        let user: User = await this.userRepository.findOneBy({
            id: createNutDTO.userId,
        });

        let nut = new Nut();
        nut.date = createNutDTO.date;
        nut.description = createNutDTO.description;
        nut.score = createNutDTO.score;
        nut.user = user;

        return await this.nutRepository.save(nut);
    }

    async getNut(userId?: string): Promise<Nut[]> {
        console.log("Fetching user nuts", userId)

        if (Number.parseInt(userId)) {
            console.log(Number.parseInt(userId));
            let user = await this.userRepository.findOneBy({
                id: Number.parseInt(userId)
            });
            console.log(user);

            return await this.nutRepository.findBy({
                user: user
            });
        }

        return await this.nutRepository.find({take: 30, relations: ['user']});
    }

}
