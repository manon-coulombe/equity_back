import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Compte} from "./Compte";
import {Transaction} from "./Transaction";
import {RepartitionTransaction} from "./RepartitionTransaction";

@Entity()
export class Participant {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({length: 20})
    nom: string;

    @Column("numeric", {nullable: true})
    revenus: number;

    @ManyToOne(() => Compte, (compte) => compte.participants, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({name: "compte_id"})
    compte: Compte;

    @OneToMany(() => Transaction, (transaction) => transaction.payeur)
    transactions_payeur: Transaction[];

    @OneToMany(() => RepartitionTransaction, (repartition) => repartition.participant)
    repartitions: RepartitionTransaction[];
}