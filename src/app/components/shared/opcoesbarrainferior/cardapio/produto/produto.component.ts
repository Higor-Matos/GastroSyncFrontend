// produto.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Produto } from '../../../models/produto.model';
import { MatDialog } from '@angular/material/dialog';
import { OpcoespedidoComponent } from '../opcoespedido/opcoespedido.component'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutoComponent {
  @Input() produto!: Produto;

  constructor(public dialog: MatDialog) {}

  abrirOpcoesPedido() {
    this.dialog.open(OpcoespedidoComponent, {
      width: '300px', // Ajuste conforme necessário
      data: { produto: this.produto }, // Passe os dados que você precisa
    });
  }
}
