import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Compte} from "./Compte";

@Entity()
export class RepartitionParDefaut {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({length: 20})
    nom: string;

    @OneToMany(() => Compte, (compte) => compte.repartition)
    comptes: Compte[];
}