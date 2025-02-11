import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Transaction} from "./Transaction";

@Entity()
export class TypeTransaction {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({length: 20})
    nom: string;

    @OneToMany(() => Transaction, (transaction) => transaction.type)
    transactions: Transaction[];
}