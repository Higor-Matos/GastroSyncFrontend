// mesa-processor.service.ts

import { Injectable } from '@angular/core';
import { Mesa } from '../mesa/mesa.service';

@Injectable({
  providedIn: 'root',
})
export class MesaProcessorService {
  processarDetalhesMesa(mesa: Mesa): any {
    return {
      numeroMesa: mesa.numeroMesa,
      totalMesa: mesa.totalConsumidoMesa,
      consumidores: mesa.consumidores.map(
        this.processarDetalhesConsumidor.bind(this)
      ),
    };
  }

  private processarDetalhesConsumidor(consumidor: any): any {
    return {
      nome: consumidor.nome,
      totalConsumido: consumidor.totalConsumido,
      pedidos: consumidor.pedidos.map(this.processarDetalhesPedido.bind(this)),
    };
  }

  private processarDetalhesPedido(pedido: any): any {
    const foiDividido = pedido.divisoes && pedido.divisoes.length > 0;
    const detalhesDivisao = foiDividido
      ? `Divisores ${pedido.divisoes.length}`
      : '';

    return {
      nomeProduto: pedido.produto?.nome ?? 'Produto Desconhecido',
      detalhesDivisao: detalhesDivisao,
    };
  }
}
