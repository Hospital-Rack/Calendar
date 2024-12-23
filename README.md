# Calendar Library

This library provides an abstract calendar and event management system built using TypeORM. It offers functionalities to
manage calendars and events in relation to participants, including functionalities such as getting event occurrences and
finding the next available appointment slots.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
- [Type Interfaces](#type-interfaces)
- [Contributing](#contributing)
- [License](#license)

## Installation

To use this library, you need to make sure that TypeORM or DrizzleORM is available in your project, as this library
depends on it as an ORM solution.

```sh
# If using typeorm
npm install reflect-metadata typeorm
# or if using drizzle
npm install drizzle-orm
```

## Usage

### Typeorm

```javascript
import { Calendar } from './path-to-your-library';
import { DataSource } from "typeorm";

let appDataSource: DataSource;

// Init must be called before data source initialization
Calendar.get().init({
    orm: 'typeorm',
    schema: 'calendar',
    datasource: () => appDataSource,
});

appDataSource = new DataSource({
    type: "postgres", // Only postgres is supported
    host: "example.com",
    port: 5432,
    username: "...",
    password: "...",
    database: "...",
    entities: [...Object.values(Calendar.get().entities)], // Pass the entities
});

// Fetch calendars
Calendar.get().getCalendars();

// Fetch event occurrences
Calendar.get().getEventOccurrences(new Date('2023-01-01'), new Date('2023-12-31')).then(events => {
    console.log(events);
});
```

## Functions

### `init(options: CalendarOptions)`

Initializes the calendar system with the given options.

| Name     | Required | Default      | Description                                                           |
|----------|----------|--------------|-----------------------------------------------------------------------|
| `orm`    | Yes      | N/A          | Specifies the ORM to use. Options include `"typeorm"` or `"drizzle"`. |
| `schema` | No       | `"calendar"` | The name of the database schema to use for the calendar tables.       |

For TypeORM:

| Name         | Required | Default | Description                                                                                                                                       |
|--------------|----------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `datasource` | Yes      | N/A     | A function that returns the TypeORM DataSource instance.                                                                                          |
| `entities`   | No       | N/A     | Optionally provides a partial configuration to override default entity classes for `calendar`, `event`, `participant`, and `participantHasEvent`. |

For Drizzle:

### `getCalendars(opts?: FindManyOptions<TC>): Promise<TC[]>`

Fetches a list of calendars based on the provided options.

### `getEventOccurrences(startDate: Date, endDate: Date, opts?: FindManyOptions<TE>): Promise<OccurrenceResult<TE>[]>`

Retrieves occurrences of events within the specified date range.

### `getNextAppointmentSlot(duration: number, builder?: (qb: QueryBuilder<TE>) => void): Promise<string | null>`

Finds the next available appointment slot of a specified duration.

## Contributing

If you would like to contribute to the library, please feel free to fork the repository and submit a pull request. For
any issues or feature requests, please open a new issue on the project's GitHub page.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
