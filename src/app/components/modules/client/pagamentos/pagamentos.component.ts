// pagamentos.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MesaService, Mesa } from '../../../services/mesa/mesa.service';
import { MesaProcessorService } from '../../../services/mesaprocessor/mesaprocessor.service';
import { AvatarService } from '../../../services/avatar/avatar.service';
import { BarraInferiorService } from '../../../services/barrainferior/barrainferior.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.scss'],
})
export class PagamentosComponent implements OnInit, OnDestroy {
  detalhesDaMesa: any;
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
        this.detalhesDaMesa.consumidores.forEach(
          (consumidor: { avatar: string }) => {
            consumidor.avatar = this.avatarService.obterAvatarAleatorio();
          }
        );
      }
    });
  }
}
