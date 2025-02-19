import {Request, Response} from "express";
import {Participant} from "../../entity/Participant";
import {Compte} from "../../entity/Compte";
import {PostgresDataSource} from "../../../app_data_source";

export async function participantPostAction(req: Request, res: Response) {
    try {
        const participantRepository = PostgresDataSource.getRepository(Participant);
        const compteRepository = PostgresDataSource.getRepository(Compte);

        const {nom, revenus, compte_id} = req.body;

        const compte = await compteRepository.findOneBy({id: compte_id});
        if (!compte) {
            res.status(400).json({message: "Compte invalide"});
        } else {
            const participant = new Participant();
            participant.nom = nom;
            participant.revenus = revenus;
            participant.compte = compte;

            const savedParticipant = await participantRepository.save(participant);
            res.status(201).json(savedParticipant);
        }
    } catch (error) {
        console.error("Erreur lors de la création du participant", error);
        res.status(500).json({message: "Erreur serveur", error});
    }
}
