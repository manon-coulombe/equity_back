import {PostgresDataSource} from "../../../app_data_source";
import {Compte} from "../../entity/Compte";
import {Request, Response} from "express";

export async function compteDeleteByIdAction(req: Request, res: Response) {
    try {
        const compteRepository = PostgresDataSource.getRepository(Compte);
        const compte = await compteRepository.findOne({where: {id: parseFloat(req.params.id)}});

        if (compte == null)  {
            res.status(404).json({message: "Compte not found"});
        } else {
            const deletedCompte = await compteRepository.remove(compte);
            res.status(200).json(deletedCompte);
        }

    } catch (error) {
        console.error("Error deleting account", error);
        res.status(500).json({ message: "Error deleting account" });
    }
}
