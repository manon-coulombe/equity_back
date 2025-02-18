import {PostgresDataSource} from "../../../app_data_source";
import {Transaction} from "../../entity/Transaction";
import {Request, Response} from "express";

export async function transactionDeleteByIdAction(req: Request, res: Response) {
    try {
        const transactionRepository = PostgresDataSource.getRepository(Transaction);
        const transaction = await transactionRepository.findOne({where: {id: parseFloat(req.params.id)}});

        if (transaction == null)  {
            res.status(404).json({message: "Transaction not found"});
        } else {
            const deletedTransaction = await transactionRepository.remove(transaction);
            res.status(200).json(deletedTransaction);
        }
    } catch (error) {
        console.log('Error deleting transaction', error);
        res.status(500).json({message: "Error deleting transaction"})
    }
}