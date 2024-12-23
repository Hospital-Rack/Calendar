import { TRRule } from "../types/rrule.type.js";
import rrule from "rrule";

export function toRRuleInput(m: Partial<TRRule>): Partial<rrule.Options> {
    return {
        freq: m.freq ? rrule.Frequency[m.freq] : undefined,
        interval: m.interval,
        until: m.until,
        count: m.count,
        byminute: m.byMinute,
        byhour: m.byHour,
        byweekday: m.byDay,
        bymonthday: m.byMonthDay,
        byyearday: m.byYearDay,
        byweekno: m.byWeekNo,
        bymonth: m.byMonth,
        bysetpos: m.bySetPos,
        dtstart: m.startDate ? new Date(m.startDate) : undefined
    }
}
