import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Compte  {
    @PrimaryGeneratedColumn()
    readonly id: number | undefined;

    @Column()
    nom: string;

    @Column({ name: "type_de_compte" })
    typeDeCompte: string;

    @Column({ name: "devise_code" })
    deviseCode: string;

    @Column({ name: "total_depenses" })
    totalDepenses: number;

    constructor(nom: string, typeDeCompte: string, deviseCode: string, totalDepenses: number) {
        this.nom = nom;
        this.typeDeCompte = typeDeCompte;
        this.deviseCode = deviseCode;
        this.totalDepenses = totalDepenses;
    }
}