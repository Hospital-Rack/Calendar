import { IsArray, IsIn, IsNumber, IsOptional, IsString, Max, Min, Validate, ValidationOptions } from "class-validator";
import { isISO8601WithZeroOffset } from "../../utils/isISO8601WithZeroOffset.js";

export class RRule {
    @IsOptional()
    @IsString()
    @IsIn(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"])
    public type?: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

    @IsOptional()
    @IsNumber()
    @Min(1)
    interval?: number;

    @IsOptional()
    @IsString()
    @Validate((d: string) => isISO8601WithZeroOffset(d), { message: "Field 'until' must be a valid ISO8601 date with zero offset" })
    @Validate((o: RRule, args: ValidationOptions) => o.count == null, { message: "Either 'count' or 'until' must be provided, but not both" })
    until?: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Validate((o: RRule, args: ValidationOptions) => o.until == null, { message: "Either 'count' or 'until' must be provided, but not both" })
    count?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(59)
    byMinute?: number;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(23)
    byHour?: number;

    @IsOptional()
    @IsString()
    @IsIn(["MO", "TU", "WE", "TH", "FR", "SA", "SU"])
    byDay?: "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(31)
    @Validate((o: RRule, args: ValidationOptions) => o.byYearDay == null, { message: "Either 'byMonthDay' or 'byYearDay' must be provided, but not both" })
    byMonthDay?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(366)
    @Validate((o: RRule, args: ValidationOptions) => o.byMonthDay == null, { message: "Either 'byMonthDay' or 'byYearDay' must be provided, but not both" })
    byYearDay?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(53)
    byWeekNo?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(12)
    byMonth?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    bySetPos?: number;

    @IsString()
    @Validate((d: string) => isISO8601WithZeroOffset(d), { message: "Field 'startDate' must be a valid ISO8601 date with zero offset" })
    startDate!: string;

    @IsOptional()
    @IsArray({ each: true })
    @Validate((d: string) => isISO8601WithZeroOffset(d), { message: "Field 'excludeDates' must be an array of valid ISO8601 dates with zero offset" })
    excludeDates?: string[];
}
