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

const TOKEN_KEY = "token";
const USER_KEY = "user";

export async function signup(cpf: string, nome: string, email: string, senha: string) {
  await api.post('/Usuario/signup', { cpf, nome, email, senha });
}

export async function login(email: string, senha: string) {
  const { data } = await api.post<LoginResponse>('/Usuario/login', { email, senha });
  return data;
}

/** Persiste {usuario, jwt} e configura o Authorization do axios. */
export function persistAuth({ usuario, jwt }: LoginResponse) {
  localStorage.setItem(TOKEN_KEY, jwt);
  localStorage.setItem(USER_KEY, JSON.stringify(usuario));
  api.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

/** Restaura o Authorization do axios a partir do localStorage (usar no bootstrap). */
export function bootstrapAuth() {
  const jwt = localStorage.getItem(TOKEN_KEY);
  if (jwt) api.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

/** Limpa a sessão local e o header Authorization. */
export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  delete api.defaults.headers.common.Authorization;
}

/** Lê o usuário logado do localStorage. */
export function getCurrentUser(): Usuario | null {
  try {
    const txt = localStorage.getItem(USER_KEY);
    return txt ? (JSON.parse(txt) as Usuario) : null;
  } catch {
    return null;
  }
}
