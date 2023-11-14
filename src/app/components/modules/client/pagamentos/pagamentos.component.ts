// pagamentos.component.ts

import { Component, OnInit } from '@angular/core';
import { MesaService, Mesa } from '../../../services/mesa/mesa.service';
import { MesaProcessorService } from '../../../services/mesaprocessor/mesaprocessor.service';

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.scss'],
})
export class PagamentosComponent implements OnInit {
  detalhesDaMesa: any;

  constructor(
    private mesaService: MesaService,
    private mesaProcessorService: MesaProcessorService
  ) {}

  ngOnInit() {
    this.carregarDetalhesDaMesa();
  }

  carregarDetalhesDaMesa() {
    this.mesaService.obterMesaEspecifica().subscribe((mesa: Mesa | null) => {
      if (mesa) {
        this.detalhesDaMesa =
          this.mesaProcessorService.processarDetalhesMesa(mesa);
      }
    });
  }
}
