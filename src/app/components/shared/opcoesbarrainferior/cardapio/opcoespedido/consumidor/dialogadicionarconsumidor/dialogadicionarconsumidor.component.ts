// dialogadicionarconsumidor.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../../../../services/dialog/dialog.service';
import { ConsumidorService } from '../../../../../../services/consumidor/consumidor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialogadicionarconsumidor',
  templateUrl: './dialogadicionarconsumidor.component.html',
  styleUrls: ['./dialogadicionarconsumidor.component.scss'],
})
export class DialogAdicionarConsumidorComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  nome: string = '';
  private initialOpen = true;

  constructor(
    private dialogRef: MatDialogRef<DialogAdicionarConsumidorComponent>,
    private dialogService: DialogService,
    private consumidorService: ConsumidorService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.subscription = this.dialogService.dialogOpen.subscribe((isOpen) => {
      if (!isOpen && !this.initialOpen) {
        this.fecharDialog();
      }
      this.initialOpen = false;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  fecharDialog(): void {
    this.dialogRef.close();
  }

  confirmarAdicao(): void {
    this.consumidorService.adicionarConsumidoresMesa([this.nome]).subscribe({
      next: (response) => {
        console.log('Consumidor adicionado:', response);
        this.toastr.success('Consumidor adicionado com sucesso!');
        this.dialogRef.close(this.nome);
      },
      error: (error) => {
        console.error('Erro ao adicionar consumidor:', error);
        this.toastr.success('Erro ao adicionar consumidor.');
      },
    });
  }
}
