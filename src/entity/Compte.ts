import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {TypeDeCompte} from "./TypeDeCompte";
import {RepartitionParDefaut} from "./RepartitionParDefaut";
import {Transaction} from "./Transaction";
import {Participant} from "./Participant";

@Entity()
export class Compte {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Column({ name: "firebase_uid", length: 100, default: '' })
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