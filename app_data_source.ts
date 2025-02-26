import {DataSource} from "typeorm";
import "dotenv/config";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: process.env.PORT_DB ? parseInt(process.env.PORT_DB) : 5432,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: ["./src/entity/*"],
    migrations: [],
    subscribers: [],
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});