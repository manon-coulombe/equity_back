import {PostgresDataSource} from "../../../app_data_source";
import {Compte} from "../../entity/Compte";
import {Request, Response} from "express";
import {TypeDeCompte} from "../../entity/TypeDeCompte";
import {RepartitionParDefaut} from "../../entity/RepartitionParDefaut";

export async function comptePostAction(req: Request, res: Response) {
    try {
        const compteRepository = PostgresDataSource.getRepository(Compte);
        const typeRepository = PostgresDataSource.getRepository(TypeDeCompte);
        const repartitionRepository = PostgresDataSource.getRepository(RepartitionParDefaut);

        const compteData = new Compte();
        compteData.nom = req.body.nom;
        compteData.devise = req.body.devise;

        const type = await typeRepository.findOneBy({id: req.body.type});
        if (type) {
            compteData.type = type;
        }

        const repartition = await repartitionRepository.findOneBy({id: req.body.repartition});
        if (repartition) {
            compteData.repartition = repartition;
        }


        const compte = compteRepository.create(compteData);
        const savedCompte = await compteRepository.save(compte);

        res.status(201).json(savedCompte);
    } catch (error) {
        console.error("Error creating account", error);
        res.status(500).json({message: "Error creating account"});
    }
}
