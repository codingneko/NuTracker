import { IsDateString, IsNotEmpty, IsNumber, MinLength } from 'class-validator';

export class CreateNutDTO {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsDateString()
    date: Date;

    description: string;

    score: number;
}
