import { IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class Notification {
    @IsOptional()
    @IsString()
    @IsIn(["NOTIFICATION", "EMAIL"])
    public type: "NOTIFICATION" | "EMAIL" = "NOTIFICATION";

    @IsOptional()
    @IsNumber()
    @Min(0)
    public duration: number = 0;

    @IsOptional()
    @IsString()
    @IsIn(["MINUTE", "HOUR", "DAY", "WEEK", "MONTH", "YEAR"])
    public beforeType: "MINUTE" | "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR" = "MINUTE";
}
