export interface IUser {
  id: number; 
  nome: string; 
  senha?: string;
  token?: string; 
}

export interface ITutor {
  id: number;
  nome: string;
  sexo?: string;
  nascimento?: string;
  telefone: string;
  endereco: string;
}

export interface IAnimal {
  id: number;
  especie: string;
  nome: string;
  raca: string;
  tutor?: ITutor; 
  tutorId?: number;
}