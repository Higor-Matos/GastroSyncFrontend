// pagamentos.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MesaService, Mesa } from '../../../services/mesa/mesa.service';
import { MesaProcessorService } from '../../../services/mesaprocessor/mesaprocessor.service';
import { AvatarService } from '../../../services/avatar/avatar.service';
import { BarraInferiorService } from '../../../services/barrainferior/barrainferior.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PagamentoDialogComponent } from './pagamentodialog/pagamento-dialog.component';

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
  mostrarOpcoesPagamento: boolean = false;
  valorTotalConsumidor: number = 0;
  botaoPagarDesabilitado: boolean = false;
  constructor(
    private mesaService: MesaService,
    private mesaProcessorService: MesaProcessorService,
    private avatarService: AvatarService,
    private barraInferiorService: BarraInferiorService,
    private dialog: MatDialog
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

  abrirOpcoesPagamento(valorTotal: number): void {
    this.botaoPagarDesabilitado = true;
    let dialogJustOpened = true;
    const dialogRef = this.dialog.open(PagamentoDialogComponent, {
      data: { valorTotal },
      disableClose: false,
      hasBackdrop: true,
    });

    dialogRef.afterOpened().subscribe(() => {
      dialogJustOpened = false;
    });

    const clickListener = (event: MouseEvent) => {
      if (dialogJustOpened) {
        return;
      }

      const target = event.target as Element;
      if (target?.closest('.cdk-overlay-container')) {
        return;
      }

      dialogRef.close();
      document.body.removeEventListener('click', clickListener);
    };

    setTimeout(() => {
      document.body.addEventListener('click', clickListener);
    }, 0);

    dialogRef.afterClosed().subscribe(() => {
      this.botaoPagarDesabilitado = false;
      document.body.removeEventListener('click', clickListener);
    });
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
