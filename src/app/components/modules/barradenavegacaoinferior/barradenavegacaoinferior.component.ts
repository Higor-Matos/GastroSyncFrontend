import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostBinding,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';
import {
  ServicoDeNavegacao,
  UserType,
  OpcaoNavegacao,
} from '../../services/servicodenavegacao.service';
import { RotaService } from '../../services/rota.service';
import { BarraInferiorService } from '../../services/barrainferior.service';

interface NavegacaoOpcao {
  icone: string;
  label: string;
  rota: string;
}

@Component({
  selector: 'barradenavegacaoinferior',
  templateUrl: './barradenavegacaoinferior.component.html',
  styleUrls: ['./barradenavegacaoinferior.component.scss'],
  // Optional: Add ViewEncapsulation if needed
})
export class BarradeNavegacaoInferiorComponent implements OnInit, OnDestroy {
  opcoesEsquerda: NavegacaoOpcao[] = [];
  opcoesDireita: NavegacaoOpcao[] = [];
  UserType = UserType;
  private routeSubscription!: Subscription;

  @ViewChild(MatToolbar, { static: true }) toolbar!: MatToolbar;

  @HostBinding('style.--altura-barra-inferior.px')
  alturaBarraInferior: number = 0;

  constructor(
    private servicodenavegacao: ServicoDeNavegacao,
    private rotaService: RotaService,
    private el: ElementRef<HTMLElement>,
    private barraInferiorService: BarraInferiorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.rotaService.onRouteChange.subscribe(
      (newUrl: string) => {
        this.servicodenavegacao.definirTipoUsuarioComBaseNaRota(newUrl);
        this.atualizarOpcoesDeNavegacao();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.calcularAltura();
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
      this.barraInferiorService.setAltura(this.alturaBarraInferior);
    }
  }
}
