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

        if (compte == null) res.status(404).json({message: "Compte not found"});

        const totalMontant = await transactionRepository
            .createQueryBuilder("transaction")
            .select("SUM(transaction.montant)", "total")
            .where("transaction.compte_id = :compteId", {compteId})
            .getRawOne();

        res.status(200).json({
            ...compte,
            totalMontant: totalMontant.total ? totalMontant.total : 0
        });
    } catch (error) {
        console.error("Error fetching compte", error);
        res.status(500).json({message: "Error fetching compte", error});
    }
}
