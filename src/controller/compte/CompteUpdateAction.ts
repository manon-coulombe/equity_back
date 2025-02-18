import {PostgresDataSource} from "../../../app_data_source";
import {Compte} from "../../entity/Compte";
import {Request, Response} from "express";

export async function compteUpdateAction(req: Request, res: Response) {
    try {
        const compteRepository = PostgresDataSource.getRepository(Compte);

        const {nom, devise, type} = req.body;
        const existingCompte = await compteRepository.findOne({
            where: {id: parseFloat(req.params.id)},
            relations: ['type'],
        });

        if (existingCompte == null) {
            res.status(404).json({message: "Compte not found"});
        } else {
            if (nom != undefined) existingCompte.nom = nom;
            if (devise != undefined) existingCompte.devise = devise;
            if (type != undefined) existingCompte.type = type;

            const updatedCompte = await compteRepository.save(existingCompte);

            res.status(200).json(updatedCompte);
        }
    } catch (error) {
        console.error("Error updating compte", error);
        res.status(500).json({message: "Error updating compte", error});
    }
}
