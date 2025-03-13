import {PostgresDataSource} from "../../../app_data_source";
import {Compte} from "../../entity/Compte";
import {Request, Response} from "express";
import {TypeDeCompte} from "../../entity/TypeDeCompte";
import {RepartitionParDefaut} from "../../entity/RepartitionParDefaut";
import {Participant} from "../../entity/Participant";

export async function comptePostAction(req: Request, res: Response) {
    try {
        const compteRepository = PostgresDataSource.getRepository(Compte);
        const typeRepository = PostgresDataSource.getRepository(TypeDeCompte);
        const repartitionRepository = PostgresDataSource.getRepository(RepartitionParDefaut);
        const participantRepository = PostgresDataSource.getRepository(Participant);

        const compteData = new Compte();
        compteData.nom = req.body.nom;
        compteData.devise = req.body.devise;

        const {type_id, repartition_id, participants} = req.body;


        const type = await typeRepository.findOneBy({id: parseInt(type_id)});
        if (type) {
            compteData.type = type;
        }

        const repartition = await repartitionRepository.findOneBy({id: parseInt(repartition_id)});
        if (repartition) {
            compteData.repartition = repartition;
        }

        const savedCompte = await compteRepository.save(compteData);

        if (Array.isArray(participants)) {
            const participantsEntities = participants.map(({nom, revenus}) => {
                const participant = new Participant();
                participant.nom = nom;
                participant.revenus = revenus;
                participant.compte = savedCompte;
                return participant;
            });

            await participantRepository.save(participantsEntities);
        }

        const compteWithParticipants = await compteRepository.findOne({
                where: {id: savedCompte.id},
                relations: ['type', 'repartition', 'participants'],
            },
        );

        res.status(201).json(compteWithParticipants);
    } catch (error) {
        console.error("Error creating account", error);
        res.status(500).json({message: "Error creating account"});
    }
}
