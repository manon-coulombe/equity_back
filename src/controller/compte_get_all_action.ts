import {PostgresDataSource} from "../../app_data_source";
import {Compte} from "../entity/Compte";
import {Request, Response} from "express";

export async function compteGetAllAction(req: Request, res: Response) {
    try {
        const compteRepository = PostgresDataSource.getRepository(Compte);
        const comptes = await compteRepository.find();
        res.status(200).json(comptes);
    } catch (error) {
        console.error("Error fetching accounts", error);
        res.status(500).json({ message: "Error fetching accounts" });
    }
}
