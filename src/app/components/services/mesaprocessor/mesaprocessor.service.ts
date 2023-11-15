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
    const detalhes = {
      numeroMesa: mesa.numeroMesa,
      totalMesa: mesa.totalConsumidoMesa,
      consumidores: mesa.consumidores.map(
        this.processarDetalhesConsumidor.bind(this)
      ),
    };

    console.log('Detalhes processados da mesa:', detalhes);
    return detalhes;
  }

  processarDetalhesConsumidor(consumidor: any): any {
    const pedidosAgrupados = this.agruparPedidosPorCategoria(
      consumidor.pedidos
    );
    console.log('Pedidos agrupados:', pedidosAgrupados);

    const detalhesConsumidor = {
      nome: consumidor.nome,
      totalConsumido: consumidor.totalConsumido,
      categorias: pedidosAgrupados,
    };

    console.log('Detalhes processados do consumidor:', detalhesConsumidor);
    return detalhesConsumidor;
  }

  private processarDetalhesPedido(pedido: any): any {
    const detalhesDivisao =
      pedido.divisoes && pedido.divisoes.length > 0
        ? {
            valorDividido:
              pedido.divisoes.reduce(
                (acc: any, div: { valorDividido: any }) =>
                  acc + div.valorDividido,
                0
              ) / pedido.divisoes.length,
            totalDivisoes: pedido.divisoes.reduce(
              (acc: any, div: { totalDivisoes: any }) =>
                acc + div.totalDivisoes,
              0
            ),
          }
        : null;

    return {
      nomeProduto: pedido.produto?.nome ?? 'Produto Desconhecido',
      quantidade: pedido.quantidade,
      preco: detalhesDivisao
        ? detalhesDivisao.valorDividido
        : pedido.produto?.preco,
      detalhesDivisao: detalhesDivisao,
    };
  }

  private agruparPedidosPorProduto(categoria: any, pedido: any): void {
    const detalhesPedido = this.processarDetalhesPedido(pedido);
    const nomeProduto = detalhesPedido.nomeProduto;
    const temDivisoes =
      detalhesPedido.detalhesDivisao &&
      detalhesPedido.detalhesDivisao.totalDivisoes > 0;

    if (!categoria[nomeProduto]) {
      categoria[nomeProduto] = {
        quantidade: 0,
        detalhesDivisao: temDivisoes
          ? detalhesPedido.detalhesDivisao
          : undefined,
        preco: 0,
      };
    }

    categoria[nomeProduto].quantidade += pedido.quantidade;

    if (temDivisoes) {
      categoria[nomeProduto].preco +=
        detalhesPedido.detalhesDivisao.valorDividido;
    } else {
      categoria[nomeProduto].preco += pedido.produto.preco;
    }
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
