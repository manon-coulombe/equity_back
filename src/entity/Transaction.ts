import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Compte} from "./Compte";
import {TypeTransaction} from "./TypeTransaction";
import {Participant} from "./Participant";
import {RepartitionTransaction} from "./RepartitionTransaction";
import { ValueTransformer } from "typeorm";

export const NumericTransformer: ValueTransformer = {
    to: (value: number) => value,
    from: (value: string | null) => (value ? parseFloat(value) : null)
};

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({length: 20})
    nom: string;

    @Column("numeric", {precision: 12, scale: 2, transformer: NumericTransformer})
    montant: number;

    @Column({length: 3})
    devise: string;

    @Column({type: 'timestamptz'})
    date: Date;

    @ManyToOne(() => Compte, (compte) => compte.transactions, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({name: "compte_id"})
    compte: Compte;

    @ManyToOne(() => TypeTransaction, {nullable: false, onDelete: "CASCADE"})
    @JoinColumn({name: "type_id"})
    type: TypeTransaction;

    @ManyToOne(() => Participant, (participant) => participant.transactions_payeur, {nullable: false})
    @JoinColumn({name: "payeur_id"})
    payeur: Participant;

    @OneToMany(() => RepartitionTransaction, (repartition) => repartition.transaction)
    repartitions: RepartitionTransaction[];
}