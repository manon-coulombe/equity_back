import {PostgresDataSource} from "../../app_data_source";
import {Compte} from "../entity/Compte";
import {Request, Response} from "express";

export async function compteGetByIdAction(req: Request, res: Response) {
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
}
