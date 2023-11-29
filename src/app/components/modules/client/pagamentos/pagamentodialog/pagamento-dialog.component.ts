import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pagamento-dialog',
  templateUrl: './pagamento-dialog.component.html',
  styleUrls: ['./pagamento-dialog.component.scss'],
})
export class PagamentoDialogComponent {
  opcaoPagamentoSelecionada: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { valorTotal: number }) {}

  selecionarOpcaoPagamento(opcao: string): void {
    this.opcaoPagamentoSelecionada = opcao;
  }
}
