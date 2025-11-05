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

        const type = await typeRepository.findOneBy({id: parseInt(req.body.type_id)});
        if (type) {
            compteData.type = type;
        }

        const repartition = await repartitionRepository.findOneBy({id: parseInt(req.body.repartition_id)});
        if (repartition) {
            compteData.repartition = repartition;
        }

        const compte = compteRepository.create(compteData);
        const savedCompte = await compteRepository.save(compte);

        for (const p of req.body.participants) {
            const participant = new Participant();
            participant.nom = p.nom;
            participant.revenus = p.revenus;
            participant.compte = savedCompte;
            await participantRepository.save(participant);
        }


        res.status(201).json({id: savedCompte.id});
    } catch (error) {
        console.error("Error creating account", error);
        res.status(500).json({message: "Error creating account"});
    }
}
