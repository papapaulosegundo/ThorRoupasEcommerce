export interface Tag { 
    id: number; 
    idTagTipo: number; 
    nome: string 
}

export interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  imagem?: string;
  preco: number;        // em centavos
  idTagTipo?: number | null;
  tags: Tag[];
}