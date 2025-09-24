// src/services/auth.ts
import { api } from './api';

export type Usuario = {
  id: number;
  cpf: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'usuario';
};

export type LoginResponse = {
  usuario: Usuario; // o back devolve { usuario, jwt } em camelCase
  jwt: string;
};

export async function signup(cpf: string, nome: string, email: string, senha: string) {
  await api.post('/Usuario/signup', { cpf, nome, email, senha });
}

export async function login(email: string, senha: string) {
  const { data } = await api.post<LoginResponse>('/Usuario/login', { email, senha });
  return data;
}
