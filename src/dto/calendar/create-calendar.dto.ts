import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCalendar {
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    public name!: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    public color?: string;
}
