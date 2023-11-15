// interfaces/consumidor-detalhado.interface.ts

import { CategoriaProdutos } from './categoria-produtos.interface';

export interface ConsumidorDetalhado {
  nome: string;
  totalConsumido: number;
  avatar: string;
  categorias: {
    [categoria: string]: CategoriaProdutos;
  };
}
