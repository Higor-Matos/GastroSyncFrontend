// button-group.component.ts
import { Component, Input } from '@angular/core';
import { Produto } from '../../../../models/produto.model';

@Component({
  selector: 'app-button-group',
  templateUrl: './buttongroup.component.html',
  styleUrls: ['./buttongroup.component.scss'],
})
export class ButtonGroupComponent {
  @Input()
  produto!: Produto;

  acaoBotao1(): void {
    console.log('Ação do botão 1');
    // Implemente a lógica necessária aqui
  }

  acaoBotao2(): void {
    console.log('Ação do botão 2');
    // Implemente a lógica necessária aqui
  }
}
