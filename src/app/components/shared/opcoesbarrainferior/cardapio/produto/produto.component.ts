import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Produto } from '../../../models/produto.model';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutoComponent {
  @Input() produto!: Produto;
  exibirOpcoesPedido: boolean = false;

  mostrarOpcoesPedido() {
    this.exibirOpcoesPedido = true;
  }
}
