import { api } from './api';

export type ProdutoInput = {
  nome: string;
  descricao?: string;
  imagem?: string;
  preco: number;
  idCategoria: number;
  idTagTipo?: number | null;
};

export type Produto = ProdutoInput & {
  id: number;
  criadoEm?: string;
  atualizadoEm?: string;
};

export async function criarProduto(payload: ProdutoInput) {
  await api.post('/Produto', payload);
}
