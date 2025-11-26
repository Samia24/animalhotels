// src/entity/Usuario.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Tutor } from "./Tutor";
import { Animal } from "./Animal";

@Entity()
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    senha: string; // Em produção, lembre-se de usar hash (bcrypt)

    // Relação: Um usuário cadastrou vários tutores
    @OneToMany(() => Tutor, (tutor) => tutor.usuarioCadastro)
    tutores: Tutor[];

    // Relação: Um usuário cadastrou vários animais
    @OneToMany(() => Animal, (animal) => animal.usuarioCadastro)
    animais: Animal[];
}   