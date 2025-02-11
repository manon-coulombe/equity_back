import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Compte} from "./Compte";
import {TypeTransaction} from "./TypeTransaction";
import {Participant} from "./Participant";
import {RepartitionTransaction} from "./RepartitionTransaction";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({length: 20})
    nom: string;

    @Column("decimal", { precision: 12, scale: 2 })
    montant: number;

    @Column({length: 3})
    devise: string;

    @Column({type: 'timestamptz'})
    date: Date;

    @ManyToOne(() => Compte, (compte) => compte.transactions, {nullable: false})
    compte: Compte;

    @ManyToOne(() => TypeTransaction, (type) => type.transactions, {nullable: false})
    type: TypeTransaction;

    @ManyToOne(() => Participant, (participant) => participant.transactions, {nullable: false})
    payeur: Participant;

    @OneToMany(() => RepartitionTransaction, (repartition) => repartition.transaction)
    repartitions: RepartitionTransaction[];
}