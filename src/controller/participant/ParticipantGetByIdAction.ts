import {Request, Response} from "express";
import {PostgresDataSource} from "../../../app_data_source";
import {Participant} from "../../entity/Participant";

export async function participantGetByIdAction(req: Request, res: Response) {
    try {
        const participantRepository = PostgresDataSource.getRepository(Participant);
        const participant = await participantRepository.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ["compte", "transactions_payeur", "repartitions"],
        });

        if (!participant) res.status(404).json({ message: "Participant non trouvé" });

        res.status(200).json(participant);
    } catch (error) {
        console.error("Erreur lors de la récupération du participant", error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
}