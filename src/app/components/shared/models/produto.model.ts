export interface ProdutoResponse {
  success: boolean;
  message: string;
  data: Produto[];
}

export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  imageUrl?: string;
}

export interface Categoria {
  nome: string;
  icon: string;
  produtos: Produto[];
}
