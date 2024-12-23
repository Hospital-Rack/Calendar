import "reflect-metadata";
import { Calendar } from "calendar";
import { Column, DataSource } from "typeorm";
import { AbstractCalendar } from "calendar/database/typeorm";

// const input = {
//     notifications: [
//         { type: "EMAIL", duration: 5, beforeType: "MINUTE" },
//         { type: "NOTIFICATION", duration: 10, beforeType: "HOUR" }
//     ]
// };
//
// const instance = plainToClass(UpdateEvent, input);
// console.log(instance);

let appDataSource: DataSource;

class MyCalendar extends AbstractCalendar {
    @Column({ type: "text" })
    userId?: string;
}

Calendar.get().init({
    datasource: () => appDataSource!,
    orm: "typeorm",
    schema: "calendar",
    entities: { calendar: MyCalendar },
});

// @Entity({ schema: "calendar" })
// class Test {
//     @PrimaryGeneratedColumn("uuid")
//     id!: string;
//
//     @Column()
//     eventId!: string;
//
//     @Column()
//     test!: string;
//
//     @OneToOne(() => Calendar.get().entities.event, { onDelete: "CASCADE" })
//     @JoinColumn()
//     event!: Relation<any>;
// }

appDataSource = new DataSource({
    type: "postgres",
    host: "hive.cyberglitch.me",
    port: 25567,
    username: "admin",
    password: "s46?1g9pC",
    database: "postgres",
    ssl: false,
    entities: [...Object.values(Calendar.get().entities)],
    synchronize: true,
    dropSchema: true,
    logging: false,
});

(async () => {
    await appDataSource.initialize();
    console.log("Data Source has been initialized!");

    const calendarRepo = appDataSource.getRepository(Calendar.get().entities.calendar);
    const eventRepo = appDataSource.getRepository(Calendar.get().entities.event);
    await calendarRepo.delete({});

    const calendar = await calendarRepo.save({ name: "Test", userId: "1" });

    const event1 = eventRepo.create({
        calendarId: calendar.id,
        name: "Event 1",
        duration: 60, // 60 minutes
        rrule: {
            freq: "DAILY",
            interval: 1,
            startDate: new Date('2024-12-23T12:00:00Z').toISOString(),
        },
    });

    const event2 = eventRepo.create({
        calendarId: calendar.id,
        name: "Event 2",
        duration: 30, // 30 minutes
        rrule: {
            freq: "HOURLY",
            interval: 1,
            startDate: new Date('2024-12-23T12:00:00Z').toISOString(),
        },
    });

    await eventRepo.save([event1, event2]);
    console.log("Mock events have been saved!");

    // // Call the function to get the next available appointment slot
    // const nextSlot = await Calendar.get().getNextAppointmentSlot(30); // Looking for a 30-minute slot
    // console.log("Next available slot:", nextSlot);

    console.log("Getting occurrences...");
    const occurrences = await Calendar.get().getEventOccurrences(
        new Date('2024-12-22T12:00:00Z'),
        new Date('2024-12-25T12:00:00Z')
    );

    console.log(occurrences.map(it => ({occ: it.nextOccurrence, name: it.event.name})));
})();
