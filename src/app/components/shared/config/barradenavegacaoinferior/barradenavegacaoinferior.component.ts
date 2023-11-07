import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  HostBinding,
  HostListener,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatToolbar } from '@angular/material/toolbar';
import { ServicoDeNavegacao } from '../../../services/navegacao/servicodenavegacao.service';
import {
  UserType,
  OpcaoNavegacao,
} from '../../../services/navegacao/tipos.service';
import { RotaService } from '../../../services/navegacao/rota.service';
import { BarraInferiorService } from '../../../services/barrainferior/barrainferior.service';
import { MesaService } from '../../../services/mesa/mesa.service';

@Component({
  selector: 'barradenavegacaoinferior',
  templateUrl: './barradenavegacaoinferior.component.html',
  styleUrls: ['./barradenavegacaoinferior.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarradeNavegacaoInferiorComponent implements OnInit, OnDestroy {
  opcoesEsquerda: OpcaoNavegacao[] = [];
  opcoesDireita: OpcaoNavegacao[] = [];
  UserType = UserType;
  private routeSubscription!: Subscription;

  @ViewChild(MatToolbar, { static: true }) toolbar!: MatToolbar;

  @HostBinding('style.--altura-barra-inferior.px')
  alturaBarraInferior: number = 0;

  constructor(
    private servicodenavegacao: ServicoDeNavegacao,
    private rotaService: RotaService,
    private mesaService: MesaService,
    private el: ElementRef<HTMLElement>,
    private barraInferiorService: BarraInferiorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.atualizarOpcoesDeNavegacao();

    this.routeSubscription = this.rotaService.onRouteChange.subscribe(
      (newUrl: string) => {
        this.atualizarOpcoesDeNavegacao();
      }
    );

    this.setAlturaBarraInferior();
  }

  irParaInicio(): void {
    console.log('BarradeNavegacaoInferiorComponent: irParaInicio');
    if (this.servicodenavegacao.tipoUsuario === UserType.Admin) {
      console.log('Redirecionando para admin');
      this.rotaService.irPara('/admin');
    } else {
      const numeroDaMesa = this.mesaService.obterNumeroDaMesa();
      console.log('Número da mesa obtido:', numeroDaMesa);
      const rotaInicio = numeroDaMesa
        ? `/client/mesa${numeroDaMesa}`
        : '/client';
      console.log('Redirecionando para:', rotaInicio);
      this.rotaService.irPara(rotaInicio);
    }
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.setAlturaBarraInferior();
  }

  @HostListener('window:resize')
  onResize() {
    this.setAlturaBarraInferior();
  }

  private atualizarOpcoesDeNavegacao(): void {
    const todasOpcoes = this.servicodenavegacao.obterOpcoesDeNavegacao();
    this.opcoesEsquerda = todasOpcoes.slice(0, 2);
    this.opcoesDireita = todasOpcoes.slice(2);
    this.cdr.markForCheck();
  }

  private setAlturaBarraInferior(): void {
    const altura = this.getToolbarHeight();
    if (altura !== this.alturaBarraInferior) {
      setTimeout(() => {
        this.alturaBarraInferior = altura;
        this.barraInferiorService.setAltura(altura);
        this.cdr.markForCheck();
      });
    }
  }

  private getToolbarHeight(): number {
    return this.toolbar?._elementRef.nativeElement.offsetHeight || 0;
  }

  get tipoUsuario(): UserType {
    return this.servicodenavegacao.tipoUsuario;
  }
}
