import { IsArray, IsNumber, IsObject, IsOptional, IsString, IsUUID, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import { RRule } from "./rrule.dto.js";
import { Type } from "class-transformer";
import { Notification } from "./notification.dto.js";
import { Participant } from "./participant.dto.js";

export class CreateEvent {
    @IsUUID()
    public calendarId!: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    public name?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    public description?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    public location?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    public duration?: number;

    @IsObject()
    @Type(() => RRule)
    public rrule!: RRule;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Notification)
    public notifications?: Notification[];

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => Participant)
    public participants?: Participant[];
}
