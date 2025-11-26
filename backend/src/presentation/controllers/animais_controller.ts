import { Request, Response } from "express";
import { AnimalService, ICreateAnimalDTO } from "../../application/services/animal_service";

const animalService = new AnimalService();

// Criar animal
export const newAnimal = async (req: Request, res: Response) => {
    const data = req.body;
    console.log("Controller - Animal!");
    console.log(data);

    const animal = await animalService.createAnimal(data as ICreateAnimalDTO);
    res.status(201).json(animal);
}

// Listar todos os animais
export const getAnimals = async (req: Request, res: Response) => {
    const animals = await animalService.getAnimals();
    res.status(200).json(animals);
}

// Consultar animal específico pelo id
export const getAnimalById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const animal = await animalService.getAnimalById(id);

    res.status(200).json(animal);
};

// Consultar animal pelo nome
export const getAnimalByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    const animal = await animalService.getAnimalByName(name);

    res.status(200).json(animal);
};

// Editar animal
export const putAnimal = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const animal = await animalService.putAnimal(id, data);
    res.status(200).json(animal);
};

// Excluir animal
export const deleteAnimal = async (req: Request, res: Response) => {
    const { id } = req.params;

    await animalService.deleteAnimal(id);

    res.status(200).json({
        message: `Animal ${id} excluído com sucesso!`
    });
};
