import express from "express";
import { DataSource} from "typeorm";
import {Compte} from "./entity/Compte";

const app = express();
app.use(express.json());

const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "soleil",
    database: "equity",
    entities: [Compte],
});

app.get("/", async (req, res) => {
    try {
        const compteRepository = PostgresDataSource.getRepository(Compte);
        const comptes = await compteRepository.find();
        res.status(200).json(comptes);
    } catch (error) {
        console.error("Error fetching accounts", error);
        res.status(500).json({ message: "Error fetching accounts" });
    }
})

app.get('/compte/:id', async (req, res) => {
    try {
        const compteRepository = PostgresDataSource.getRepository(Compte);
        const compte = await compteRepository.findOne({where: {id: parseFloat(req.params.id)}});

        if (compte == undefined) res.status(404).json({message: "Compte not found"});
        res.status(200).json(compte);
    }
    catch (error) {
        console.error("Error fetching compte", error);
        res.status(500).json({ message: "Error fetching compte", error });
    }
})

app.post('/compte', async (req, res) => {
    try {
        const compteRepository = PostgresDataSource.getRepository(Compte);

        const compteData = {
            nom: req.body.nom,
            typeDeCompte: req.body.type_de_compte,
            deviseCode: req.body.devise_code,
            totalDepenses: parseFloat(req.body.total_depenses)
        };

        const compte = compteRepository.create(compteData);
        const savedCompte = await compteRepository.save(compte);

        res.status(201).json(savedCompte);
    } catch (error) {
        console.error("Error creating account", error);
        res.status(500).json({ message: "Error creating account" });
    }
});

app.listen(3000, async () => {
    console.log("Server running on port 3000");

    await PostgresDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
})