import {PostgresDataSource} from "../../../app_data_source";
import {Compte} from "../../entity/Compte";
import {Request, Response} from "express";
import {Transaction} from "../../entity/Transaction";

export async function compteGetByIdAction(req: Request, res: Response) {
    try {
        const compteRepository = PostgresDataSource.getRepository(Compte);
        const transactionRepository = PostgresDataSource.getRepository(Transaction);

        const compteId = parseInt(req.params.id);

        const compte = await compteRepository.findOne({
            where: {id: compteId},
            relations: ['type', 'repartition', 'transactions', 'participants', 'transactions.type', 'transactions.payeur', "transactions.repartitions", "transactions.repartitions.participant"],
        });

        if (!compte) {
            res.status(404).json({message: "Compte not found"});
        } else {
            const transactions = await transactionRepository.find({where: {compte: {id: compteId}}});
            let totalMontant = 0;

            for (const transaction of transactions) {
                totalMontant += transaction.montantConverti;
            }

            const participantsBalance: Record<number, number> = {};

            for (const participant of compte.participants) {
                participantsBalance[participant.id] = 0;
            }

            for (const transaction of compte.transactions) {
                participantsBalance[transaction.payeur.id] += transaction.montantConverti;

                for (const repartition of transaction.repartitions) {
                    participantsBalance[repartition.participant.id] -= repartition.montantConverti;
                }
            }

            const balance = compte.participants.map(p => ({
                participant: p.nom,
                solde: participantsBalance[p.id]
            }));

            res.status(200).json({
                ...compte,
                totalMontant,
                balance: balance
            });
        }

    } catch (error) {
        console.error("Error fetching compte", error);
        res.status(500).json({message: "Error fetching compte", error});
    }
}
