import "reflect-metadata";
import { Calendar } from "calendar";
import {Column, DataSource, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Relation} from "typeorm";
import {AbstractCalendar} from "calendar";

const calendar = new Calendar();

console.log(calendar.entities);
class MyCalendar extends AbstractCalendar {
    @Column({ type: "text" })
    userId?: string;
}

calendar.init({ entities: { calendar: MyCalendar } });


@Entity({ schema: "calendar" })
class Papia {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    eventId!: string;

    @OneToOne(() => calendar.entities.event,e => e, { onDelete: "CASCADE" })
    @JoinColumn()
    event!: Relation<InstanceType<typeof calendar.entities.event>>;
}

let papia = new Papia()

const AppDataSource = new DataSource({
    type: "postgres",
    host: "hive.cyberglitch.me",
    port: 25567,
    username: "admin",
    password: "s46?1g9pC",
    database: "postgres",
    ssl: false,
    entities: [...Object.values(calendar.entities),Papia],
    synchronize: true,
    dropSchema: true,
    logging: true,
});

(async () => {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
})();
