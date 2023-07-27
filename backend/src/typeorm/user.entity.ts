import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Nut } from './nut.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    avatar?: string;

    @OneToMany(() => Nut, (nut) => nut.user)
    nuts: Nut[];
}
