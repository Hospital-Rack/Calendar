export function isISO8601WithZeroOffset(date: string): boolean {
    const iso8601Regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])Z$/;

    if (!iso8601Regex.test(date)) return false;

    const [datePart, timePart] = date.split("T");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute, second] = timePart.slice(0, -1).split(":").map(Number);

    const daysInMonth = (month: number) => {
        return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    };

    const isLeapYear = (year: number) => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

    if (day < 1 || day > daysInMonth(month)) return false;
    return !(hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59);
}
