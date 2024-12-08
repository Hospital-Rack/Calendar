import "reflect-metadata";
import { Calendar } from "calendar";
import { Column, DataSource, Entity } from "typeorm";

const calendar = new Calendar();

// console.log(calendar.entities.calendar)
//
// @Entity({schema: 'calendar'})
// class MyCalendar extends calendar.entities.calendar {
//     @Column({type: 'text'})
//     userId?: string;
// }
//
// calendar.init({ entities: { calendar: MyCalendar } });

console.log(calendar.entities.event);

const AppDataSource = new DataSource({
    type: "postgres",
    host: "10.0.50.2",
    username: "admin",
    password: "evergreen-smashing-mayday-footsore-unstaffed-computer",
    database: "calendartest",
    ssl: false,
    entities: [...Object.values(calendar.entities)],
    synchronize: true,
    dropSchema: true,
    logging: true,
});

(async () => {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
})();
