// mesa-processor.service.ts

import { Injectable } from '@angular/core';
import { Mesa } from '../mesa/mesa.service';

export interface PedidoAgrupado {
  nomeProduto: string;
  detalhesDivisao: any;
}

interface CategoriaPedidos {
  [categoria: string]: {
    [nomeProduto: string]: {
      quantidade: number;
      detalhesDivisao?: any;
    };
  };
}

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

  processarDetalhesConsumidor(consumidor: any): any {
    const pedidosAgrupados = this.agruparPedidosPorCategoria(
      consumidor.pedidos
    );
    return {
      nome: consumidor.nome,
      totalConsumido: consumidor.totalConsumido,
      categorias: pedidosAgrupados,
    };
  }

  private processarDetalhesPedido(pedido: any): any {
    const detalhesDivisao =
      pedido.divisoes && pedido.divisoes.length > 0
        ? {
            divisores: pedido.divisoes.length,
            totalDivisoes: pedido.divisoes.reduce(
              (acc: any, div: { totalDivisoes: any }) =>
                acc + div.totalDivisoes,
              0
            ),
          }
        : { divisores: 0, totalDivisoes: 0 };

    return {
      nomeProduto: pedido.produto?.nome ?? 'Produto Desconhecido',
      detalhesDivisao: detalhesDivisao,
    };
  }

  private agruparPedidosPorProduto(categoria: any, pedido: any): void {
    const nomeProduto = pedido.produto?.nome ?? 'Produto Desconhecido';
    const temDivisoes = pedido.divisoes && pedido.divisoes.length > 0;
    const chaveProduto = temDivisoes
      ? `${nomeProduto} (Com Divisões)`
      : nomeProduto;

    if (!categoria[chaveProduto]) {
      categoria[chaveProduto] = {
        quantidade: 0,
        detalhesDivisao: temDivisoes ? pedido.detalhesDivisao : undefined,
      };
    }
    categoria[chaveProduto].quantidade += pedido.quantidade;
  }

  private agruparPedidosPorCategoria(pedidos: any[]): CategoriaPedidos {
    const categorias: CategoriaPedidos = {};
    pedidos.forEach((pedido) => {
      const categoria = pedido.produto?.categoria ?? 'Categoria Desconhecida';
      if (!categorias[categoria]) {
        categorias[categoria] = {};
      }
      this.agruparPedidosPorProduto(categorias[categoria], pedido);
    });
    return categorias;
  }
}
