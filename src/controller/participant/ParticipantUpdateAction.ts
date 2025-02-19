import {Request, Response} from "express";
import {PostgresDataSource} from "../../../app_data_source";
import {Participant} from "../../entity/Participant";

export async function participantUpdateAction(req: Request, res: Response) {
    try {
        const participantRepository = PostgresDataSource.getRepository(Participant);

        const {nom, revenus} = req.body;

        const existingParticipant = await participantRepository.findOne({
            where: {id: parseInt(req.params.id)},
        });

        if (!existingParticipant) {
            res.status(404).json({message: "Participant non trouvé"});
        } else {
            if (nom !== undefined) existingParticipant.nom = nom;
            if (revenus !== undefined) existingParticipant.revenus = parseFloat(revenus);

            const updatedParticipant = await participantRepository.save(existingParticipant);
            res.status(200).json(updatedParticipant);
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour du participant", error);
        res.status(500).json({message: "Erreur serveur", error});
    }
}