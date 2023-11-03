import { Component, Input } from '@angular/core';
import { OpcaoNavegacao } from './opcao-navegacao.interface';

@Component({
  selector: 'app-opcao-navegacao',
  templateUrl: './opcao-navegacao.component.html',
  styleUrls: ['./opcao-navegacao.component.scss'],
})
export class OpcaoNavegacaoComponent {
  @Input() opcao!: OpcaoNavegacao;
}
