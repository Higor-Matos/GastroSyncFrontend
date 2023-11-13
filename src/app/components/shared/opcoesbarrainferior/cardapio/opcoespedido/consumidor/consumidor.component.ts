// consumidor.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MesaService } from '../../../../../services/mesa/mesa.service';
import { AvatarService } from '../../../../../services/avatar/avatar.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAdicionarConsumidorComponent } from '../consumidor/dialogadicionarconsumidor/dialogadicionarconsumidor.component';
import { ConsumidorService } from '../../../../../services/consumidor/consumidor.service';
@Component({
  selector: 'app-consumidor',
  templateUrl: './consumidor.component.html',
  styleUrls: ['./consumidor.component.scss'],
})
export class ConsumidorComponent implements OnInit, OnDestroy {
  consumidores: any[] = [];
  isDialogOpen: boolean = false;
  avataresPorConsumidor: { [key: string]: string } = {};
  idsSelecionados: number[] = [];

  constructor(
    private mesaService: MesaService,
    private avatarService: AvatarService,
    private dialog: MatDialog,
    private consumidorService: ConsumidorService
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
            'Nenhuma mesa correspondente encontrada ou sem consumidore'
          );
        }
      },
      error: (err) => {
        console.error('Erro ao obter mesas:', err);
      },
    });
    this.mesaService.consumidoresAtualizados$.subscribe(
      (consumidoresAtualizados) => {
        this.atualizarListaDeConsumidores(consumidoresAtualizados);
      }
    );
  }

  ngOnDestroy() {
    this.limparSelecao();
  }

  limparSelecao(): void {
    this.consumidores.forEach((c) => (c.selecionado = false));
    this.consumidorService.limparSelecao();
  }

  atualizarListaDeConsumidores(novosConsumidores: any[]) {
    novosConsumidores.forEach((consumidor) => {
      if (!this.avataresPorConsumidor[consumidor.nome]) {
        // Atribua um avatar apenas se o consumidor for novo
        this.avataresPorConsumidor[consumidor.nome] =
          this.avatarService.obterAvatarAleatorio();
      }
    });
    this.consumidores = novosConsumidores.map((consumidor) => ({
      ...consumidor,
      avatar: this.avataresPorConsumidor[consumidor.nome],
    }));
  }

  selecionarConsumidor(consumidor: any): void {
    consumidor.selecionado = !consumidor.selecionado;
    this.consumidorService.selecionarConsumidor(consumidor.id);
  }

  adicionarConsumidor() {
    if (this.isDialogOpen) {
      return;
    }

    this.isDialogOpen = true;
    let dialogJustOpened = true;
    const dialogRef = this.dialog.open(DialogAdicionarConsumidorComponent, {});

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

    dialogRef.afterClosed().subscribe((nome: string) => {
      document.body.removeEventListener('click', clickListener);
      this.isDialogOpen = false; // Atualizar o estado para indicar que o diálogo está fechado
      // ... lógica após fechar o diálogo, como adicionar um novo consumidor
    });
  }
}
