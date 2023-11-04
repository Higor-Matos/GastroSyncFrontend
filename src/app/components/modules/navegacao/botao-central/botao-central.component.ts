import { Component, Input } from '@angular/core';
import { TipoUsuario } from '../../../services/navegacao/servicodenavegacao.service';

@Component({
  selector: 'app-botao-central',
  templateUrl: './botao-central.component.html',
  styleUrls: ['./botao-central.component.scss'],
})
export class BotaoCentralComponent {
  @Input() tipoUsuario!: TipoUsuario;

  get rota(): string {
    return this.tipoUsuario === TipoUsuario.Admin ? '/admin' : '/cliente';
  }
}
