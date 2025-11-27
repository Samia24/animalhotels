import axios, { AxiosHeaders } from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Depois mudaremos se necessário
});

// Isso aqui garante que o token vá em todas as requisições automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('animalHotels:token');
  if (token) {
    if (!config.headers) config.headers = new AxiosHeaders();
    (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
  }
  return config;
});

export const getTutores = () => api.get("/tutores");
export const getTutorById = (id: string) => api.get(`/tutores/${id}`);
export const createTutor = (data: any) => api.post("/tutores", data);
export const updateTutor = (id: string, data: any) => api.put(`/tutores/${id}`, data);
export const deleteTutor = (id: string) => api.delete(`/tutores/${id}`);