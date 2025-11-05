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
            const compteDevise = compte.devise;
            const transactions = await transactionRepository.find({where: {compte: {id: compteId}}});

            let totalMontant = 0;


            for (const transaction of transactions) {
                let montantConverti = transaction.montant;

                // if (transaction.devise !== compteDevise) {
                //
                //     try {
                //         // console.log(`transaction.devise ${transaction.devise}`);
                //         // console.log(`compteDevise ${compteDevise}`);
                //         // console.log(`transaction.montant ${transaction.montant}`);
                //
                //         montantConverti = await currencyConverter
                //             .from(transaction.devise)
                //             .to(compteDevise)
                //             .convert();
                //         // console.log(`montantConverti ${montantConverti}`);
                //
                //     } catch (conversionError) {
                //         console.error(`Erreur de conversion ${transaction.devise} -> ${compteDevise}`, conversionError);
                //         continue;
                //     }
                // }
                totalMontant += montantConverti;
            }

            res.status(200).json({
                ...compte,
                totalMontant
            });
        }

    } catch (error) {
        console.error("Error fetching compte", error);
        res.status(500).json({message: "Error fetching compte", error});
    }
}
