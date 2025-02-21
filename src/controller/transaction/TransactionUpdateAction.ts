import {PostgresDataSource} from "../../../app_data_source";
import {Transaction} from "../../entity/Transaction";
import {Request, Response} from "express";
import {TypeTransaction} from "../../entity/TypeTransaction";
import {Participant} from "../../entity/Participant";
import {RepartitionTransaction} from "../../entity/RepartitionTransaction";

export async function transactionUpdateAction(req: Request, res: Response) {
    try {
        const transactionRepository = PostgresDataSource.getRepository(Transaction);
        const typeRepository = PostgresDataSource.getRepository(TypeTransaction);
        const participantRepository = PostgresDataSource.getRepository(Participant);
        const repartitionRepository = PostgresDataSource.getRepository(RepartitionTransaction);

        const {nom, montant, devise, date, type_id, payeur_id, repartitions} = req.body;

        const transactionId = parseInt(req.params.id);
        const existingTransaction = await transactionRepository.findOne({
            where: {id: transactionId},
            relations: ['compte', 'type', 'payeur', 'repartitions'],
        });

        if (!existingTransaction) {
            res.status(404).json({message: "Transaction non trouvée"});
        } else {
            if (nom !== undefined) existingTransaction.nom = nom;
            if (montant !== undefined) existingTransaction.montant = montant;
            if (devise !== undefined) existingTransaction.devise = devise;
            if (date !== undefined) existingTransaction.date = new Date(date);

            if (type_id !== undefined) {
                const type = await typeRepository.findOneBy({id: type_id});
                type ? existingTransaction.type = type
                    : res.status(400).json({message: "Type de transaction invalide"});
            }

            if (payeur_id !== undefined) {
                const payeur = await participantRepository.findOneBy({id: payeur_id});
                payeur ? existingTransaction.payeur = payeur
                    : res.status(400).json({message: "Payeur invalide"});
            }

            if (Array.isArray(repartitions)) {
                await repartitionRepository.delete({transaction: {id: transactionId}});

                const repartitionsToSave = repartitions.map(
                    async (rep: { participant_id: string, montant: string }) => {
                        const participant = await participantRepository.findOneBy({id: parseInt(rep.participant_id)});
                        if (!participant) return null;

                        const repartition = new RepartitionTransaction();
                        repartition.transaction = existingTransaction;
                        repartition.participant = participant;
                        repartition.montant = parseFloat(rep.montant);

                        await repartitionRepository.save(repartition);
                    }
                );

                await Promise.all(repartitionsToSave);
            }

            const updatedTransaction = await transactionRepository.save(existingTransaction);

            res.status(200).json(updatedTransaction);
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour partielle de la transaction", error);
        res.status(500).json({message: "Erreur serveur", error});
    }
}
