// src/entity/Animal.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Tutor } from "./Tutor";
import { Usuario } from "./Usuario";

@Entity()
export class Animal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    especie: string;

    @Column()
    nome: string;

    @Column()
    raca: string;

    // Relação: O animal pertence a um Tutor
    @ManyToOne(() => Tutor, (tutor) => tutor.animais)
    tutor: Tutor;

    // Relação com Usuario (quem cadastrou)
    @ManyToOne(() => Usuario, (usuario) => usuario.animais)
    usuarioCadastro: Usuario;
}