import { IsNotEmpty } from 'class-validator';

export class CreateNutDTO {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    date: Date;

    description: string;

    score: number;
}
