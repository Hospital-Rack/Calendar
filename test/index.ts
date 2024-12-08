import "reflect-metadata";
import { Calendar } from "calendar";
import { Column, DataSource, Entity, JoinColumn, OneToOne, Relation } from "typeorm";

const calendar = new Calendar();

console.log(calendar.entities.calendar);

// @Entity({ schema: "calendar" })
class MyCalendar extends calendar.entities.calendar {
    @Column({ type: "text" })
    userId?: string;
}

calendar.init({ entities: { calendar: MyCalendar } });
console.log(calendar.entities);

@Entity({ schema: "calendar" })
class Papia {
    @Column()
    calendarId!: string;

    @OneToOne(() => {
        console.log(':::', calendar.entities.calendar);
        return calendar.entities.calendar
    })
    @JoinColumn()
    calendar!: Relation<MyCalendar>;
}

console.log(calendar.entities);

const AppDataSource = new DataSource({
    type: "postgres",
    host: "10.0.50.2",
    username: "admin",
    password: "evergreen-smashing-mayday-footsore-unstaffed-computer",
    database: "calendartest",
    ssl: false,
    entities: [...Object.values(calendar.entities), Papia],
    synchronize: true,
    dropSchema: true,
    logging: true,
});

(async () => {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
})();
