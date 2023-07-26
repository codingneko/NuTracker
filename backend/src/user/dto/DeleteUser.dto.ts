import { IsNumberString } from "class-validator";

export class DeleteUserDTO {
    @IsNumberString()
    userId: number;
}
