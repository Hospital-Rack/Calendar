import "reflect-metadata";
import { Calendar } from "calendar";
import {Column, DataSource, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {AbstractCalendar} from "calendar/database/typeorm";

let appDataSource: DataSource;

class MyCalendar extends AbstractCalendar {
    @Column({ type: "text" })
    userId?: string;
}

Calendar.get().init({
    datasource: () => appDataSource!,
    orm: 'typeorm',
    schema: "calendar",
    entities: { calendar: MyCalendar }
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
    logging: true,
});

(async () => {
    await appDataSource.initialize();
    console.log("Data Source has been initialized!");

    const calendarRepo = appDataSource.getRepository(Calendar.get().entities.calendar);
    const eventRepo = appDataSource.getRepository(Calendar.get().entities.event);

    const calendar = await calendarRepo.save({name: 'Test', userId: '1'})

    const event1 = eventRepo.create({
        calendarId: calendar.id,
        name: 'Event 1',
        duration: 60, // 60 minutes
        rrule: {
            startDate: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // Starts in 10 minutes
        },
    });

    const event2 = eventRepo.create({
        calendarId: calendar.id,
        name: 'Event 2',
        duration: 30, // 30 minutes
        rrule: {
            startDate: new Date(Date.now() + 1000 * 60 * 80).toISOString(), // Starts in 80 minutes
        },
    });

    await eventRepo.save([event1, event2]);
    console.log("Mock events have been saved!");

    // Call the function to get the next available appointment slot
    const nextSlot = await Calendar.get().getNextAppointmentSlot({
        duration: 30, // Looking for a 30-minute slot
    });
    console.log('Next available slot:', nextSlot);

})();
