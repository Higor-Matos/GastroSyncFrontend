import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faBarcode,
  faCreditCard,
  faMoneyBillWave,
} from '@fortawesome/free-solid-svg-icons';
import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-pagamento-dialog',
  templateUrl: './pagamento-dialog.component.html',
  styleUrls: ['./pagamento-dialog.component.scss'],
})
export class PagamentoDialogComponent {
  opcaoPagamentoSelecionada: string = '';
  faBarcode = faBarcode;
  faApple = faApple;
  faGoogle = faGoogle;
  faCreditCard = faCreditCard;
  faMoneyBillWave = faMoneyBillWave;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { valorTotal: number }) {}

  selecionarOpcaoPagamento(opcao: string): void {
    this.opcaoPagamentoSelecionada = opcao;
  }
}
