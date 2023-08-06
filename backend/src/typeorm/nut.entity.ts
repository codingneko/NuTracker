import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Nut {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(type => User, (user) => user.nuts)
    user: User;

    @Column({ nullable: true })
    date: Date;

    @Column({ nullable: true, length: 3000 })
    description: string;

    @Column({ nullable: true })
    score: number;
}
