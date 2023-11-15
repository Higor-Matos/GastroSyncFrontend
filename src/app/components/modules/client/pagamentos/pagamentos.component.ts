// pagamentos.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MesaService, Mesa } from '../../../services/mesa/mesa.service';
import { MesaProcessorService } from '../../../services/mesaprocessor/mesaprocessor.service';
import { AvatarService } from '../../../services/avatar/avatar.service';
import { BarraInferiorService } from '../../../services/barrainferior/barrainferior.service';
import { Subscription } from 'rxjs';

interface PedidoAgrupado {
  nomeProduto: string;
  detalhesDivisao: any;
}

interface CategoriaProdutos {
  [produtoNome: string]: {
    quantidade: number;
    detalhesDivisao?: any;
  };
}

interface ConsumidorDetalhado {
  nome: string;
  totalConsumido: number;
  avatar: string;
  categorias: {
    [categoria: string]: CategoriaProdutos;
  };
}

interface DetalhesMesa {
  numeroMesa: number;
  totalMesa: number;
  consumidores: ConsumidorDetalhado[];
}
@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.scss'],
})
export class PagamentosComponent implements OnInit, OnDestroy {
  detalhesDaMesa?: DetalhesMesa;
  alturaBarraInferior: number = 0;
  private subscriptions: Subscription[] = [];

  constructor(
    private mesaService: MesaService,
    private mesaProcessorService: MesaProcessorService,
    private avatarService: AvatarService,
    private barraInferiorService: BarraInferiorService
  ) {}

  ngOnInit() {
    this.carregarDetalhesDaMesa();
    this.subscriptions.push(
      this.barraInferiorService.alturaBarraInferior$.subscribe((altura) => {
        this.alturaBarraInferior = altura;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  carregarDetalhesDaMesa() {
    this.mesaService.obterMesaEspecifica().subscribe((mesa: Mesa | null) => {
      if (mesa) {
        this.detalhesDaMesa =
          this.mesaProcessorService.processarDetalhesMesa(mesa);

        if (this.detalhesDaMesa) {
          this.detalhesDaMesa.consumidores.forEach(
            (consumidor: ConsumidorDetalhado) => {
              consumidor.avatar = this.avatarService.obterAvatarAleatorio();
            }
          );
        }
      }
    });
  }

  getPedidosAgrupados(pedidos: any): PedidoAgrupado[] {
    return pedidos as PedidoAgrupado[];
  }

  getProdutoQuantidade(produto: any): number {
    return produto?.quantidade ?? 0;
  }

  getProdutoDetalhesDivisao(produto: any): any {
    return produto?.detalhesDivisao;
  }

  getProdutoTotalDivisoes(produto: any): number {
    return produto?.detalhesDivisao?.totalDivisoes ?? 0;
  }
}
