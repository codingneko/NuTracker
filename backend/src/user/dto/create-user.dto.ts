import {
    IsEmail,
    IsNotEmpty,
    IsUrl,
    ValidateIf,
    MinLength,
    IsNotIn,
} from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsNotIn(['leaderboard'])
    username: string;

    @IsNotEmpty()
    password: string;

    @IsEmail()
    @ValidateIf((object, value) => value)
    email?: string;

    @IsUrl()
    @ValidateIf((object, value) => value)
    avatar?: string;
}
