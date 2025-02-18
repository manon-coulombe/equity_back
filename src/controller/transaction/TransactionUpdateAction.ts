import {PostgresDataSource} from "../../../app_data_source";
import {Transaction} from "../../entity/Transaction";
import {Request, Response} from "express";

export async function transactionUpdateAction(req: Request, res: Response) {
    try {
        const transactionRepository = PostgresDataSource.getRepository(Transaction);
        const {nom, montant, devise, date, type, payeur} = req.body;

        const existingTransaction = await transactionRepository.findOne({
            where: {id: parseInt(req.params.id)},
            relations: ['compte', 'type', 'payeur'],
        });

        if (!existingTransaction) {
            res.status(404).json({message: "Transaction non trouvée"});
        } else {
            if (nom !== undefined) existingTransaction.nom = nom;
            if (montant !== undefined) existingTransaction.montant = montant;
            if (devise !== undefined) existingTransaction.devise = devise;
            if (date !== undefined) existingTransaction.date = date;
            if (type !== undefined) existingTransaction.type = type;
            if (payeur !== undefined) existingTransaction.payeur = payeur;

            const updatedTransaction = await transactionRepository.save(existingTransaction);

            res.status(200).json(updatedTransaction);
        }
    } catch (error) {
        console.error("Erreur lors de la mise à jour partielle de la transaction", error);
        res.status(500).json({message: "Erreur serveur", error});
    }
}
