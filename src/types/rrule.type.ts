export type TRRule = {
    freq: "SECONDLY" | "MINUTELY" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
    interval: number;
    until: Date;
    count: number;
    byMinute: number;
    byHour: number;
    byDay: "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";
    byMonthDay: number;
    byYearDay: number;
    byWeekNo: number;
    byMonth: number;
    bySetPos: number;
    startDate: string;
    excludeDates: string[];
};
