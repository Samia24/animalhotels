import axios from 'axios';

export const api = axios.create({
  baseURL: '/', 
});

// === TUTORES ===
export const getTutores = () => api.get("/tutores");
export const getTutorById = (id: string) => api.get(`/tutores/${id}`);
export const createTutor = (data: any) => api.post("/tutores", data);
export const updateTutor = (id: string, data: any) => api.put(`/tutores/${id}`, data);
export const deleteTutor = (id: string) => api.delete(`/tutores/${id}`);

// === ANIMAIS ===
export const getAnimais = () => api.get("/animais");
export const getAnimalById = (id: string) => api.get(`/animais/${id}`);
export const createAnimal = (data: any) => api.post("/animais", data);
export const updateAnimal = (id: string, data: any) => api.put(`/animais/${id}`, data);
export const deleteAnimal = (id: string) => api.delete(`/animais/${id}`);

// === USUÁRIOS (NOVO) ===
export const getUsers = () => api.get("/users");
export const getUserById = (id: string) => api.get(`/users/${id}`);
export const createUser = (data: any) => api.post("/users", data);
export const updateUser = (id: string, data: any) => api.put(`/users/${id}`, data);
export const deleteUser = (id: string) => api.delete(`/users/${id}`);