import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { UserNote } from "./entity/UserNote";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, UserNote],
    migrations: [],
    subscribers: [],
});
