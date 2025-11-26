// src/entity/Tutor.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Animal } from "./Animal";
import { Usuario } from "./Usuario";

@Entity()
export class Tutor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    sexo: string;

    @Column()
    nascimento: Date;

    @Column()
    telefone: string;

    @Column()
    endereco: string;

    // Relação com Usuario (quem cadastrou)
    // O diagrama pede "codUsuarioCadastro", o TypeORM cria isso automaticamente como usuarioCadastroId
    @ManyToOne(() => Usuario, (usuario) => usuario.tutores)
    @JoinColumn({ name: "codUsuarioCadastro" }) // Forçando o nome da coluna conforme diagrama
    usuarioCadastro: Usuario;

    // Relação: Um tutor tem vários animais
    @OneToMany(() => Animal, (animal) => animal.tutor)
    animais: Animal[];
}