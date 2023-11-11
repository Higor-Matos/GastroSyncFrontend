// consumidor.component.ts

import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../../../../services/mesa/mesa.service';

@Component({
  selector: 'app-consumidor',
  templateUrl: './consumidor.component.html',
  styleUrls: ['./consumidor.component.scss'],
})
export class ConsumidorComponent implements OnInit {
  constructor(private mesaService: MesaService) {}

  ngOnInit() {
    this.mesaService.obterTodasAsMesas().subscribe({
      next: (mesa) => {
        if (mesa) {
          console.log('Mesa encontrada:', mesa);
        } else {
          console.log('Nenhuma mesa correspondente encontrada');
        }
      },
      error: (err) => {
        console.error('Erro ao obter mesas:', err);
      },
    });
  }
}
