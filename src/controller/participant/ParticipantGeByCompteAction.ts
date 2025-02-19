import {Request, Response} from "express";
import {PostgresDataSource} from "../../../app_data_source";
import {Participant} from "../../entity/Participant";

export async function participantsGetByCompteAction(req: Request, res: Response) {
    try {
        const participantRepository = PostgresDataSource.getRepository(Participant);

        const participants = await participantRepository.find({
            where: { compte: { id: parseInt(req.params.compteId) } },
            relations: ["compte"],
        });

        res.status(200).json(participants);
    } catch (error) {
        console.error("Erreur lors de la récupération des participants du compte", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
}