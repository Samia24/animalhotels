import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Animal } from "../entity/Animal";

export interface ICreateAnimalDTO {
    especie: string;
    nome: string;
    raca: string;
    tutorId: number;        // vínculo com o Tutor
    usuarioCadastroId: number; // vínculo com o Usuario que cadastrou
}

export class AnimalService {
    private animalDataSource: Repository<Animal>;

    constructor() {
        this.animalDataSource = AppDataSource.getRepository(Animal);
    }

    async createAnimal(data: ICreateAnimalDTO): Promise<Animal> {
        const animal = this.animalDataSource.create({
            especie: data.especie,
            nome: data.nome,
            raca: data.raca,
            tutor: { id: data.tutorId },
            usuarioCadastro: { id: data.usuarioCadastroId }
        });

        await this.animalDataSource.save(animal);
        return animal;
    }

    async getAnimals(): Promise<Animal[]> {
        // ADICIONADO: relations: ["tutor"]
        const animals = await this.animalDataSource.find({
            relations: ["tutor"]
        });
        return animals;
    }

    async getAnimalById(id: string): Promise<Animal> {
        // ALTERADO: de findOneBy para findOne para suportar relações
        const animal = await this.animalDataSource.findOne({
            where: { id: Number(id) },
            relations: ["tutor"]
        });
        return animal;
    }

    async getAnimalByName(nome: string): Promise<Animal> {
        // ALTERADO: de findOneBy para findOne para suportar relações
        const animal = await this.animalDataSource.findOne({
            where: { nome },
            relations: ["tutor"]
        });
        return animal;
    }

    async putAnimal(id: string, data: Partial<Animal>): Promise<Animal> {
        const animal = await this.animalDataSource.findOneBy({ id: Number(id) });
        
        // Atualiza apenas os campos enviados
        Object.assign(animal, data);

        await this.animalDataSource.save(animal);
        return animal;
    }

    async deleteAnimal(id: string): Promise<void> {
        await this.animalDataSource.delete(Number(id));
    }

}