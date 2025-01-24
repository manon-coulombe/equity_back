import {PostgresDataSource} from "../../app_data_source";
import {Compte} from "../entity/Compte";
import {Request, Response} from "express";

export async function comptePostAction(req: Request, res: Response) {
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
}
