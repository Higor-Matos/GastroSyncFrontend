// consumidor.component.ts

import { Component, OnInit } from '@angular/core';
import { MesaService } from '../../../../../services/mesa/mesa.service';
import { AvatarService } from '../../../../../services/avatar/avatar.service';

@Component({
  selector: 'app-consumidor',
  templateUrl: './consumidor.component.html',
  styleUrls: ['./consumidor.component.scss'],
})
export class ConsumidorComponent implements OnInit {
  consumidores: any[] = [];

  constructor(
    private mesaService: MesaService,
    private avatarService: AvatarService
  ) {}

  ngOnInit() {
    this.mesaService.obterTodasAsMesas().subscribe({
      next: (mesa) => {
        if (mesa?.consumidores) {
          this.consumidores = mesa.consumidores.map((c) => ({
            ...c,
            avatar: this.avatarService.obterAvatarAleatorio(),
          }));
          console.log('Consumidores da mesa:', this.consumidores);
        } else {
          console.log(
            'Nenhuma mesa correspondente encontrada ou sem consumidores'
          );
        }
      },
      error: (err) => {
        console.error('Erro ao obter mesas:', err);
      },
    });
  }

  adicionarConsumidor() {
    console.log('Adicionar novo consumidor');
  }
}
