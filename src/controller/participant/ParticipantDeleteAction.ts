import {PostgresDataSource} from "../../../app_data_source";
import {Participant} from "../../entity/Participant";
import {Request, Response} from "express";

export async function participantDeleteAction(req: Request, res: Response) {
    try {
        const participantRepository = PostgresDataSource.getRepository(Participant);

        const existingParticipant = await participantRepository.findOneBy({id: parseInt(req.params.id)});
        if (!existingParticipant) {
            res.status(404).json({message: "Participant non trouvé"});
        } else {
            await participantRepository.remove(existingParticipant);
            res.status(200).json({message: "Participant supprimé avec succès"});
        }
    } catch (error) {
        console.error("Erreur lors de la suppression du participant", error);
        res.status(500).json({message: "Erreur serveur", error});
    }
}