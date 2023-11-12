// dialogadicionarconsumidor.component.ts

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-dialogadicionarconsumidor',
  templateUrl: './dialogadicionarconsumidor.component.html',
  styleUrls: ['./dialogadicionarconsumidor.component.scss'],
})
export class DialogAdicionarConsumidorComponent {
  nome: string = '';

  constructor(
    private dialogRef: MatDialogRef<DialogAdicionarConsumidorComponent>
  ) {}

  fecharDialog(): void {
    this.dialogRef.close();
  }

  confirmarAdicao(): void {
    this.dialogRef.close(this.nome);
  }
}