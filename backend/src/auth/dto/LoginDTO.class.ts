import { IsNotEmpty, MinLength } from "class-validator";

export class LoginDTO {
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}