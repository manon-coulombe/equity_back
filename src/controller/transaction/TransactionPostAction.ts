import {PostgresDataSource} from "../../../app_data_source";
import {Transaction} from "../../entity/Transaction";
import {Request, Response} from "express";
import {RepartitionTransaction} from "../../entity/RepartitionTransaction";

export async function transactionPostAction(req: Request, res: Response) {
    try {
        const transactionRepository = PostgresDataSource.getRepository(Transaction);
        const repartitionRepository = PostgresDataSource.getRepository(RepartitionTransaction);

        const transactionData = new Transaction();
        transactionData.nom = req.body.nom;
        transactionData.montant = req.body.montant;
        transactionData.devise = req.body.devise;
        transactionData.date = req.body.date;
        transactionData.compte = req.body.compte;
        transactionData.type = req.body.type;
        transactionData.payeur = req.body.payeur;

        const savedTransaction = await transactionRepository.save(transactionData);

        if (req.body.repartitions && req.body.repartitions.length > 0) {
            const repartitionsToSave = req.body.repartitions.map((r: RepartitionTransaction) => {
                return repartitionRepository.create({
                    transaction: savedTransaction,
                    participant: r.participant,
                    montant: r.montant,
                });
            });

          const savedRepartitions =  await repartitionRepository.save(repartitionsToSave);
        }

        res.status(200).json({savedTransaction, ...savedRepartitions});
    } catch (error) {
        console.log('Error creating transaction', error);
        res.status(500).json({message: "Error creating transaction"})
    }
}