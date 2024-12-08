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

@Entity({ schema: "calendar" })
class Test {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    eventId!: string;

    @Column()
    test!: string;

    @OneToOne(() => Calendar.get().entities.event, { onDelete: "CASCADE" })
    @JoinColumn()
    event!: Relation<any>;
}

appDataSource = new DataSource({
    type: "postgres",
    host: "hive.cyberglitch.me",
    port: 25567,
    username: "admin",
    password: "s46?1g9pC",
    database: "postgres",
    ssl: false,
    entities: [...Object.values(Calendar.get().entities),Test],
    synchronize: true,
    dropSchema: true,
    logging: true,
});

(async () => {
    await appDataSource.initialize();
    console.log("Data Source has been initialized!");

    const eventRepo = appDataSource.getRepository(Calendar.get().entities.event);
    eventRepo.find({
        relations: {
            calendar: true
        }
    })

    console.log(await Calendar.get().getCalendars<MyCalendar>({
        select: {
            id: true,
            userId: true
        }
    }));
})();
