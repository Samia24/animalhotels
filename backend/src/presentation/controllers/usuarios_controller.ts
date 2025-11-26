import { Request, Response } from "express";
import { ICreateUserDTO, UserService } from "../../application/services/user_service";

const userService = new UserService();

// Criar usuário
export const newUser = async (req: Request, res: Response) => {
    const data = req.body;
    console.log("Controller!");
    console.log(data);
    const user = await userService.createUser(data as ICreateUserDTO);
    res.status(201).json(user);
}


// Listar todos os usuários
export const getUsers = async (req: Request, res: Response) => {
    const users = await userService.getUsers();
    res.status(200).json(users);
}

// Consultar usuário específico pelo id
export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json(user);
};

// Consultar usuário específico pelo nome
export const getUserByName = async (req: Request, res: Response) => {
    const { name } = req.params;
    const user = await userService.getUserByName(name);
    res.status(200).json(user);
};

// Editar usuário
export const putUsers = async (req: Request, res: Response) => {
    const { id } = req.params; // pega o ID da URL
    const data = req.body;

    const user = await userService.putUsers(id, data);
    res.status(200).json(user);
};

// Excluir usuário
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    await userService.deleteUser(id);

    res.status(200).json({
        message: `Usuário ${id} excluído com sucesso!`
    });
};