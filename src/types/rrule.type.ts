export type TRRule = {
    freq: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
    interval: number;
    until: Date;
    count: number;
    byMinute: number;
    byHour: number;
    byDay: string;
    byMonthDay: number;
    byYearDay: number;
    byWeekNo: number;
    byMonth: number;
    bySetPos: number;
    startDate: string;
    excludeDates: string[];
};
