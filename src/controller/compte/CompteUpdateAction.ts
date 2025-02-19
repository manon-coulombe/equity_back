import {PostgresDataSource} from "../../../app_data_source";
import {Compte} from "../../entity/Compte";
import {Request, Response} from "express";
import {TypeDeCompte} from "../../entity/TypeDeCompte";

export async function compteUpdateAction(req: Request, res: Response) {
    try {
        const compteRepository = PostgresDataSource.getRepository(Compte);
        const typeRepository = PostgresDataSource.getRepository(TypeDeCompte);

        const {nom, devise, type_id} = req.body;
        const existingCompte = await compteRepository.findOne({
            where: {id: parseInt(req.params.id)},
            relations: ['type'],
        });

        if (existingCompte == null) {
            res.status(404).json({message: "Compte not found"});
        } else {
            if (nom != undefined) existingCompte.nom = nom;
            if (devise != undefined) existingCompte.devise = devise;

            if (type_id !== undefined) {
                const type = await typeRepository.findOneBy({id: parseInt(type_id)});
                type ? existingCompte.type = type
                    : res.status(400).json({message: "Type de compte invalide"});
            }
            const updatedCompte = await compteRepository.save(existingCompte);

            res.status(200).json(updatedCompte);
        }
    } catch (error) {
        console.error("Error updating compte", error);
        res.status(500).json({message: "Error updating compte", error});
    }
}
