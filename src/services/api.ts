import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Depois mudaremos se necessário
});

// Isso aqui garante que o token vá em todas as requisições automaticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('animalHotels:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});