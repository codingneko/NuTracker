import { IsNumber, IsNumberString } from 'class-validator';

export class DeleteUserDTO {
    @IsNumber()
    userId: number;
}
