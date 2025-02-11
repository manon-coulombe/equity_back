import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Transaction} from "./Transaction";
import {Participant} from "./Participant";

@Entity()
export class RepartitionTransaction {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column("decimal", {precision: 12, scale: 2})
    montant: number;

    @ManyToOne(() => Transaction, (transaction) => transaction.repartitions, {nullable: false})
    transaction: Transaction;

    @ManyToOne(() => Participant, (participant) => participant.repartitions, {nullable: false})
    participant: Participant;
}