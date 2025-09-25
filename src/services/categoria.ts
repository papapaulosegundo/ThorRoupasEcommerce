import { api } from "./api";

export type Categoria = {
  id?: number;
  nome: string;
  slug: string;
  descricao?: string;
  ativo: boolean;
};

export type CategoriaInput = Omit<Categoria, "id">;

type CategoriaAPI = {
  id?: number;
  nome: string;
  slug: string;
  descricao?: string;
  ativo?: boolean;
  ativa?: boolean;
};

function normalizeCategoria(r: CategoriaAPI): Categoria {
  return {
    id: r.id,
    nome: r.nome,
    slug: r.slug,
    descricao: r.descricao,
    ativo: Boolean(r.ativo ?? r.ativa ?? false),
  };
}

export async function criarCategoria(payload: CategoriaInput) {
    const { data } = await api.post<Categoria>("/Categoria", payload);
  return normalizeCategoria(data as unknown as CategoriaAPI);
}

export async function listarCategorias(limit = 100, offset = 0): Promise<Categoria[]> {
  const { data } = await api.get<CategoriaAPI[]>("/Categoria", {
    params: { limit, offset },
  });
  return (data ?? []).map(normalizeCategoria);
}

export async function listarCategoriasAtivas(limit = 100, offset = 0): Promise<Categoria[]> {
    const todas = await listarCategorias(limit, offset);
  return todas.filter((c) => c.ativo);
}

export async function obterCategoriaPorSlug(slug: string): Promise<Categoria | null> {
  const { data } = await api.get<Categoria[]>("/Categoria", { params: { limit: 1000, offset: 0 } });
  const lista = data ?? [];
  return lista.find((c) => c.slug === slug) ?? null;
}