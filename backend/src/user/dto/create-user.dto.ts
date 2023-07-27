import {
    IsEmail,
    IsNotEmpty,
    IsUrl,
    ValidateIf,
    MinLength,
} from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsEmail()
    @ValidateIf((object, value) => value)
    email?: string;

    @IsUrl()
    @ValidateIf((object, value) => value)
    avatar?: string;
}
