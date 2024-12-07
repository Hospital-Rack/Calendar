export type TNotification = {
    type: "NOTIFICATION" | "EMAIL";
    before: number;
    beforeType: "MINUTE" | "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
};
