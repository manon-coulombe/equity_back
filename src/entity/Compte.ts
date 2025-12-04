import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TypeDeCompte} from "./TypeDeCompte";
import {RepartitionParDefaut} from "./RepartitionParDefaut";
import {Transaction} from "./Transaction";
import {Participant} from "./Participant";

@Entity()
export class Compte {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({ name: "firebase_uid", length: 100 })
    firebaseUid: string;

    @Column({length: 20})
    nom: string;

    @Column({length: 3})
    devise: string;

    @ManyToOne(() => TypeDeCompte, (type) => type.comptes, {nullable: true, onDelete: "CASCADE"})
    @JoinColumn({name: "type_id"})
    type: TypeDeCompte;

    @ManyToOne(() => RepartitionParDefaut, (repartition) => repartition.comptes, {nullable: true})
    repartition: RepartitionParDefaut;

    @OneToMany(() => Transaction, (transaction) => transaction.compte)
    transactions: Transaction[];

    @OneToMany(() => Participant, (participant) => participant.compte)
    participants: Participant[];
}