import {
  Component,
  HostBinding,
  HostListener,
  OnInit,
  ElementRef,
} from '@angular/core';
import {
  ServicoDeNavegacao,
  UserType,
} from '../../services/servicodenavegacao.service';
import { RotaService } from '../../services/rota.service';
import { BarraInferiorService } from '../../services/barrainferior.service';

@Component({
  selector: 'barradenavegacaoinferior',
  templateUrl: './barradenavegacaoinferior.component.html',
  styleUrls: ['./barradenavegacaoinferior.component.scss'],
})
export class BarradeNavegacaoInferiorComponent implements OnInit {
  opcoesEsquerda: any[] = [];
  opcoesDireita: any[] = [];
  UserType = UserType;

  @HostBinding('style.--altura-barra-inferior.px')
  alturaBarraInferior: number = 0;

  constructor(
    private servicodenavegacao: ServicoDeNavegacao,
    private rotaService: RotaService,
    private el: ElementRef,
    private barraInferiorService: BarraInferiorService
  ) {}

  ngOnInit(): void {
    this.rotaService.onRouteChange.subscribe((newUrl: string) => {
      this.servicodenavegacao.definirTipoUsuarioComBaseNaRota(newUrl);
      this.atualizarOpcoesDeNavegacao();
    });
    this.calcularAltura();
  }

  get tipoUsuario(): 'admin' | 'client' {
    return this.servicodenavegacao.tipoUsuario;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.calcularAltura();
  }

  private atualizarOpcoesDeNavegacao(): void {
    const todasOpcoes = this.servicodenavegacao.obterOpcoesDeNavegacao();
    this.opcoesEsquerda = todasOpcoes.slice(0, 2);
    this.opcoesDireita = todasOpcoes.slice(2);
  }

  private calcularAltura() {
    this.alturaBarraInferior = this.el.nativeElement.offsetHeight;
    this.barraInferiorService.setAltura(this.alturaBarraInferior);
  }
}
