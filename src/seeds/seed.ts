import {PostgresDataSource} from "../../app_data_source";
import {TypeDeCompte} from "../entity/TypeDeCompte";
import {TypeTransaction} from "../entity/TypeTransaction";
import {RepartitionParDefaut} from "../entity/RepartitionParDefaut";

const seedDatabase = async () => {
    await PostgresDataSource.initialize();
    const typeDeCompteRepo = PostgresDataSource.getRepository(TypeDeCompte);
    const typeTransactionRepo = PostgresDataSource.getRepository(TypeTransaction);
    const repartitionRepo = PostgresDataSource.getRepository(RepartitionParDefaut);

    await typeDeCompteRepo.upsert(
        [{ id: 1, nom: "COUPLE" }, { id: 2, nom: "COLOCATION" }, {id: 3, nom: "VOYAGE"}, {id: 4, nom: "PROJET"}],
        ["id"]
    );

    await typeTransactionRepo.upsert(
        [{ id: 1, nom: "DEPENSE" }, { id: 2, nom: "REVENU" }, { id: 3, nom: "TRANSFERT" }],
        ["id"]
    );

    await repartitionRepo.upsert(
        [{ id: 1, nom: "EQUITABLE" }, { id: 2, nom: "EGALE" }],
        ["id"]
    );

    console.log("Données de base insérées avec succès !");
    process.exit();
};

seedDatabase().catch((error) => console.error(error));
