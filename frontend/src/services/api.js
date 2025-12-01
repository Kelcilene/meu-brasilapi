import axios from 'axios';

// A URL base do seu servidor Express
const api = axios.create({
  baseURL: 'http://localhost:3001', 
});

// Adiciona o token JWT a cada requisição (Requisito de Sessão Ativa)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;