import { api } from "./api";

export type Categoria = {
  id?: number;
  nome: string;
  slug: string;
  descricao?: string;
  ativo: boolean;
};

export async function criarCategoria(payload: Categoria) {
  const { data } = await api.post("/Categoria", payload);
  return data as Categoria;
}

export async function listarCategorias(
  limit = 100,
  offset = 0,
  apenasAtivas = false
): Promise<Categoria[]> {
  const { data } = await api.get<Categoria[]>("/Categoria", {
    params: { limit, offset },
  });
  return apenasAtivas ? data.filter((c) => c.ativo) : data;
}
