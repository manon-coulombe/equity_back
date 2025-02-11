import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Compte} from "./Compte";

@Entity()
export class RepartitionParDefaut {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({length: 20, unique: true})
    nom: string;

    @OneToMany(() => Compte, (compte) => compte.repartition)
    comptes: Compte[];
}