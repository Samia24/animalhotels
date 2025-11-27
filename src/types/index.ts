export interface IUser {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface ITutor {
  id: string;
  name: string;
  email: string;
  phone: string;
}

// Interface para o formulário de Animal
export interface AnimalFormData {
  name: string;
  species: string;
  breed: string;
  age: number;
  tutorId: string; // Vínculo FK
}

export interface IAnimal {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  tutorId: string;
}

