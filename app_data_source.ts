import {DataSource} from "typeorm";
import {Compte} from "./src/entity/Compte";
import {Participant} from "./src/entity/Participant";
import {Transaction} from "./src/entity/Transaction";
import {RepartitionParDefaut} from "./src/entity/RepartitionParDefaut";
import {RepartitionTransaction} from "./src/entity/RepartitionTransaction";
import {TypeTransaction} from "./src/entity/TypeTransaction";
import {TypeDeCompte} from "./src/entity/TypeDeCompte";
import "dotenv/config";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: process.env.PORT ? parseInt(process.env.PORT) : 5432,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: true,
    logging: false,
    entities: [Compte, Transaction, Participant, RepartitionParDefaut, RepartitionTransaction, TypeTransaction, TypeDeCompte],
    migrations: [],
    subscribers: [],
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});