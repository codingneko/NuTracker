import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: true})
    email?: string;

    @Column({nullable: true})
    avatar?: string;
}
