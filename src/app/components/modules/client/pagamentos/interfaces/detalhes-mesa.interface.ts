// interfaces/detalhes-mesa.interface.ts

import { ConsumidorDetalhado } from './consumidor-detalhado.interface';

export interface DetalhesMesa {
  numeroMesa: number;
  totalMesa: number;
  consumidores: ConsumidorDetalhado[];
}
