import {PostgresDataSource} from "../../../app_data_source";
import {Transaction} from "../../entity/Transaction";
import {Request, Response} from "express";

export async function transactionGetAllByCompteIdAction(req: Request, res: Response) {
    try {
        const transactionRepository = PostgresDataSource.getRepository(Transaction);

        const transactions = await transactionRepository.findBy({
            compte: {id: parseFloat(req.params.id)}
        });

        res.status(200).json(transactions);
    } catch (error) {
        console.log('Error fetching transactions', error);
        res.status(500).json({message: "Error fetching transactions"})
    }
}