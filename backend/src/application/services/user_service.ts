import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";

export interface ICreateUserDTO {
    nome: string;
    senha: string;
}

export class UserService {
    private userDataSource: Repository<Usuario>;

    constructor() {
        this.userDataSource = AppDataSource.getRepository(Usuario);
    }

    async createUser(data: ICreateUserDTO): Promise<Usuario> {
        console.log("service!");
        console.log(data);
        const user = this.userDataSource.create(data);
        await this.userDataSource.save(user);
        return user;
    }

    async getUsers(): Promise<Usuario[]> {
        const users = await this.userDataSource.find();
        return users;
    }

    async getUserById(id: string): Promise<Usuario> {
        const user = await this.userDataSource.findOneBy({ id: Number(id) });
        return user;
    }

    async getUserByName(nome: string): Promise<Usuario> {
        const user = await this.userDataSource.findOneBy({ nome });
        return user;
    }

    async putUsers(id: string, data: Partial<Usuario>): Promise<Usuario> {
        const user = await this.userDataSource.findOneBy({ id: Number(id) });
        
        // Atualiza apenas os campos enviados
        Object.assign(user, data);

        await this.userDataSource.save(user);
        return user;
    }

    async deleteUser(id: string): Promise<void> {
        await this.userDataSource.delete(Number(id));
    }

}