import { Request, Response } from "express";
import { TutorService, ICreateTutorDTO } from "../../application/services/tutor_service";

const tutorService = new TutorService();

// Criar tutor
export const newTutor = async (req: Request, res: Response) => {
    const data = req.body;
    console.log("Controller - Tutor!");
    console.log(data);

    const tutor = await tutorService.createTutor(data as ICreateTutorDTO);
    res.status(201).json(tutor);
}

// Listar todos os tutores
export const getTutores = async (req: Request, res: Response) => {
    const tutores = await tutorService.getTutores();
    res.status(200).json(tutores);
}

// Consultar tutor pelo id
export const getTutorById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const tutor = await tutorService.getTutorById(id);

    res.status(200).json(tutor);
};

// Consultar tutor pelo nome
export const getTutorByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    const tutor = await tutorService.getTutorByName(name);

    res.status(200).json(tutor);
};

// Editar tutor
export const putTutores = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body;

    const tutor = await tutorService.putTutores(id, data);
    res.status(200).json(tutor);
};

// Excluir tutor
export const deleteTutor = async (req: Request, res: Response) => {
    const { id } = req.params;

    await tutorService.deleteTutor(id);

    res.status(200).json({
        message: `Tutor ${id} excluído com sucesso!`
    });
};
