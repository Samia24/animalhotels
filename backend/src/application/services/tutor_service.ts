import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Tutor } from "../entity/Tutor";

export interface ICreateTutorDTO {
    nome: string;
    sexo: string;
    nascimento: Date;
    telefone: string;
    endereco: string;
    usuarioCadastroId: number; // id do usuário que cadastrou
}

export class TutorService {
    private tutorDataSource: Repository<Tutor>;

    constructor() {
        this.tutorDataSource = AppDataSource.getRepository(Tutor);
    }

    async createTutor(data: ICreateTutorDTO): Promise<Tutor> {
        const tutor = this.tutorDataSource.create({
            nome: data.nome,
            sexo: data.sexo,
            nascimento: data.nascimento,
            telefone: data.telefone,
            endereco: data.endereco,
            usuarioCadastro: { id: data.usuarioCadastroId }  // relação
        });

        await this.tutorDataSource.save(tutor);
        return tutor;
    }

    async getTutores(): Promise<Tutor[]> {
        const tutores = await this.tutorDataSource.find();
        return tutores;
    }

    async getTutorById(id: string): Promise<Tutor> {
        const tutor = await this.tutorDataSource.findOneBy({ id: Number(id) });
        return tutor;
    }

    async getTutorByName(nome: string): Promise<Tutor> {
        const tutor = await this.tutorDataSource.findOneBy({ nome });
        return tutor;
    }

    async putTutores(id: string, data: Partial<Tutor>): Promise<Tutor> {
        const tutor = await this.tutorDataSource.findOneBy({ id: Number(id) });

        // Atualiza apenas os campos enviados
        Object.assign(tutor, data);

        await this.tutorDataSource.save(tutor);
        return tutor;
    }

    async deleteTutor(id: string): Promise<void> {
        await this.tutorDataSource.delete(Number(id));
    }

}