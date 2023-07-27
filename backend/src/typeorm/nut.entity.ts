import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Nut {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(() => User, (user) => user.nuts)
    user: User;

    @Column({ nullable: true })
    date: Date;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    score: number;
}
