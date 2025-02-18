import {DataSource} from "typeorm";
import {Compte} from "./src/entity/Compte";
import {Participant} from "./src/entity/Participant";
import {Transaction} from "./src/entity/Transaction";
import {RepartitionParDefaut} from "./src/entity/RepartitionParDefaut";
import {RepartitionTransaction} from "./src/entity/RepartitionTransaction";
import {TypeTransaction} from "./src/entity/TypeTransaction";
import {TypeDeCompte} from "./src/entity/TypeDeCompte";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "soleil",
    database: "equity",
    synchronize: true,
    logging: false,
    entities: [Compte, Transaction, Participant, RepartitionParDefaut, RepartitionTransaction, TypeTransaction, TypeDeCompte],
    migrations: [],
    subscribers: [],
});