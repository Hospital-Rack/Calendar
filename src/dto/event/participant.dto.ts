import { IsBoolean, IsEmail, IsOptional } from "class-validator";

export class Participant {
    @IsEmail()
    public email!: string;

    @IsOptional()
    @IsBoolean()
    isOrganizer: boolean = false;
}
