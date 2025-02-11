import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Compte} from "./Compte";

@Entity()
export class TypeDeCompte {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column({length: 20, unique: true})
    nom: string;

    @OneToMany(() => Compte, (compte) => compte.type)
    comptes: Compte[];
}