// interfaces/categoria-produtos.interface.ts

export interface CategoriaProdutos {
  [produtoNome: string]: {
    quantidade: number;
    preco: number;
    detalhesDivisao?: any;
  };
}
