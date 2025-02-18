import {PostgresDataSource} from "../../../app_data_source";
import {Transaction} from "../../entity/Transaction";
import {Request, Response} from "express";

export async function transactionGetByIdAction(req: Request, res: Response) {
    try {
        const transactionRepository = PostgresDataSource.getRepository(Transaction);

        const transaction = await transactionRepository.findOne({
            where: {id: parseFloat(req.params.id)}
        });

        if (transaction == null) res.status(404).json({message: "Transaction not found"});

        res.status(200).json(transaction);
    } catch (error) {
        console.log('Error fetching transaction', error);
        res.status(500).json({message: "Error fetching transaction"})
    }
}