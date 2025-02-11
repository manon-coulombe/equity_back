import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TypeDeCompte} from "./TypeDeCompte";
import {RepartitionParDefaut} from "./RepartitionParDefaut";
import {Transaction} from "./Transaction";
import {Participant} from "./Participant";

@Entity()
export class Compte {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({length: 20})
    nom: string;

    @Column({length: 3})
    devise: string;

    @ManyToOne(() => TypeDeCompte, (type) => type.comptes, {nullable: false})
    type: TypeDeCompte;

    @ManyToOne(() => RepartitionParDefaut, (repartition) => repartition.comptes, {nullable: false})
    repartition: RepartitionParDefaut;

    @OneToMany(() => Transaction, (transaction) => transaction.compte)
    transactions: Transaction[];

    @OneToMany(() => Participant, (participant) => participant.compte)
    participants: Participant[];
}