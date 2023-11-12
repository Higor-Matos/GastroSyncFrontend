// dialogadicionarconsumidor.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogService } from '../../../../../../services/dialog/dialog.service';

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
    private dialogService: DialogService
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
    this.dialogRef.close(this.nome);
  }
}
