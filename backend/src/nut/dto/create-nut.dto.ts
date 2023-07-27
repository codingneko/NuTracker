import {
    IsEmail,
    IsNotEmpty,
    IsUrl,
    ValidateIf,
    MinLength,
} from 'class-validator';

export class CreateNutDTO {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    date: Date;

    description: string;
}
