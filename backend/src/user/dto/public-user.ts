import { Nut } from 'src/typeorm/nut.entity';

export default class PublicUser {
    id: number;
    username: string;
    avatar: string;
    nuts: Nut[];
}
