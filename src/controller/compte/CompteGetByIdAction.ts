import {PostgresDataSource} from "../../../app_data_source";
import {Compte} from "../../entity/Compte";
import {Request, Response} from "express";
import {Transaction} from "../../entity/Transaction";
import {CurrencyService} from "../../services/CurrencyService";

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
                let montantConverti = transaction.montant;

                if (transaction.devise !== compte.devise) {
                    montantConverti = await CurrencyService.convert(
                        transaction.montant,
                        transaction.devise,
                        compte.devise,
                    );
                }
                totalMontant += montantConverti;
            }

            const participantsBalance: Record<number, number> = {};

            for (const participant of compte.participants) {
                participantsBalance[participant.id] = 0;
            }

            for (const transaction of compte.transactions) {
                participantsBalance[transaction.payeur.id] += transaction.montant;

                for (const rep of transaction.repartitions) {
                    participantsBalance[rep.participant.id] -= rep.montant;
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
