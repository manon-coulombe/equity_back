import {DataSource} from "typeorm";
import {Compte} from "./src/entity/Compte";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "soleil",
    database: "equity",
    entities: [Compte],
});