import {PostgresDataSource} from "../../../app_data_source";
import {Transaction} from "../../entity/Transaction";
import {Request, Response} from "express";
import {RepartitionTransaction} from "../../entity/RepartitionTransaction";
import {Compte} from "../../entity/Compte";
import {TypeTransaction} from "../../entity/TypeTransaction";
import {Participant} from "../../entity/Participant";

export async function transactionPostAction(req: Request, res: Response) {
    try {
        const transactionRepository = PostgresDataSource.getRepository(Transaction);
        const compteRepository = PostgresDataSource.getRepository(Compte);
        const typeRepository = PostgresDataSource.getRepository(TypeTransaction);
        const participantRepository = PostgresDataSource.getRepository(Participant);
        const repartitionRepository = PostgresDataSource.getRepository(RepartitionTransaction);

        const {compte_id, type_id, payeur_id, repartitions} = req.body;

        const compte: Compte | null = await compteRepository.findOneBy({id: compte_id});
        if (!compte) res.status(400).json({message: "Compte introuvable"});

        const type: TypeTransaction | null = await typeRepository.findOneBy({id: type_id});
        if (!type) res.status(400).json({message: "Type de transaction introuvable"});

        const payeur: Participant | null = await participantRepository.findOneBy({id: payeur_id});
        if (!payeur) res.status(400).json({message: "Payeur introuvable"});

        const transaction = new Transaction();
        transaction.nom = req.body.nom;
        transaction.montant = req.body.montant;
        transaction.devise = req.body.devise;
        transaction.date = new Date(req.body.date);
        transaction.compte = compte!;
        transaction.type = type!;
        transaction.payeur = payeur!;

        const savedTransaction = await transactionRepository.save(transaction);

        if (Array.isArray(repartitions)) {
            const repartitionsToSave = repartitions.map(
                async (rep: { participant_id, montant }) => {
                    const participant = await participantRepository.findOneBy({id: parseInt(rep.participant_id)});
                    if (!participant) return null;

                    const repartition = new RepartitionTransaction();
                    repartition.transaction = savedTransaction;
                    repartition.participant = participant;
                    repartition.montant = parseFloat(rep.montant);

                    return repartitionRepository.save(repartition);
                }
            );

            await Promise.all(repartitionsToSave);
        }

        const transactionWithRelations = await transactionRepository.findOne({
            where: {id: savedTransaction.id},
            relations: ["compte", "type", "payeur", "repartitions", "repartitions.participant"],
        });

        res.status(201).json(transactionWithRelations);
    } catch (error) {
        console.log('Error creating transaction', error);
        res.status(500).json({message: "Error creating transaction"})
    }
}