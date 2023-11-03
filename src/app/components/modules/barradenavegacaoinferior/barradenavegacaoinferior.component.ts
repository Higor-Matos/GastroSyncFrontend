import {
  Component,
  OnInit,
  AfterViewInit,
  HostBinding,
  HostListener,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
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
export class BarradeNavegacaoInferiorComponent
  implements OnInit, AfterViewInit
{
  opcoesEsquerda: any[] = [];
  opcoesDireita: any[] = [];
  UserType = UserType;

  @ViewChild(MatToolbar, { static: true }) toolbar!: MatToolbar;

  @HostBinding('style.--altura-barra-inferior.px')
  alturaBarraInferior: number = 0;

  constructor(
    private servicodenavegacao: ServicoDeNavegacao,
    private rotaService: RotaService,
    private el: ElementRef<HTMLElement>,
    private barraInferiorService: BarraInferiorService
  ) {}

  ngOnInit(): void {
    this.rotaService.onRouteChange.subscribe((newUrl: string) => {
      this.servicodenavegacao.definirTipoUsuarioComBaseNaRota(newUrl);
      this.atualizarOpcoesDeNavegacao();
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.calcularAltura());
  }

  get tipoUsuario(): UserType {
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
    const toolbarNativeElement = this.toolbar._elementRef
      .nativeElement as HTMLElement;
    if (toolbarNativeElement) {
      this.alturaBarraInferior = toolbarNativeElement.offsetHeight;
      console.log('Altura da Barra Inferior:', this.alturaBarraInferior);
      this.barraInferiorService.setAltura(this.alturaBarraInferior);
    }
  }
}
