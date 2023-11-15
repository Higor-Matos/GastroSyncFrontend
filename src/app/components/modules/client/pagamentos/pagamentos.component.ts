// pagamentos.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MesaService, Mesa } from '../../../services/mesa/mesa.service';
import { MesaProcessorService } from '../../../services/mesaprocessor/mesaprocessor.service';
import { AvatarService } from '../../../services/avatar/avatar.service';
import { BarraInferiorService } from '../../../services/barrainferior/barrainferior.service';
import { Subscription } from 'rxjs';

import { PedidoAgrupado } from './interfaces/pedido-agrupado.interface';
import { ConsumidorDetalhado } from './interfaces/consumidor-detalhado.interface';
import { DetalhesMesa } from './interfaces/detalhes-mesa.interface';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.scss'],
})
export class PagamentosComponent implements OnInit, OnDestroy {
  detalhesDaMesa?: DetalhesMesa;
  alturaBarraInferior: number = 0;
  private subscriptions: Subscription[] = [];
  customColors: any;

  constructor(
    private mesaService: MesaService,
    private mesaProcessorService: MesaProcessorService,
    private avatarService: AvatarService,
    private barraInferiorService: BarraInferiorService
  ) {
    this.customColors = {
      domain: ['#E53935', '#4CAF50'],
    };
  }

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

  getPieChartData(detalhesDivisao: any) {
    const totalDivisoes = detalhesDivisao.totalDivisoes;
    if (totalDivisoes > 0) {
      const valorPorDivisao = 100 / totalDivisoes;
      return Array.from({ length: totalDivisoes }, (v, i) => ({
        name: `Parte ${i + 1}`,
        value: valorPorDivisao,
      }));
    }
    return [];
  }

  carregarDetalhesDaMesa() {
    this.mesaService.obterMesaEspecifica().subscribe((mesa: Mesa | null) => {
      console.log('Dados recebidos da API:', mesa);
      if (mesa) {
        console.log('Dados processados:', this.detalhesDaMesa);
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
