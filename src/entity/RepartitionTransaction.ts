import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Transaction} from "./Transaction";
import {Participant} from "./Participant";

@Entity()
export class RepartitionTransaction {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column("numeric", {precision: 12, scale: 2})
    montant: number;

    @ManyToOne(() => Transaction, (transaction) => transaction.repartitions, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({ name: "transaction_id" })
    transaction: Transaction;

    @ManyToOne(() => Participant, (participant) => participant.repartitions, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({ name: "participant_id" })
    participant: Participant;
}