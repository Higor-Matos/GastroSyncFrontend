import {
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ThemeService, ThemeType } from '../../../services/tema/theme.service';
import { BarraInferiorService } from '../../../services/barrainferior/barrainferior.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(500)),
    ]),
  ],
})
export class InicioComponent implements OnInit {
  isDarkTheme: boolean;

  constructor(
    private themeService: ThemeService,
    private barraInferiorService: BarraInferiorService,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdRef: ChangeDetectorRef // Adicionando ChangeDetectorRef
  ) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  ngOnInit(): void {
    this.themeService.themeChanged.subscribe((newTheme: ThemeType) => {
      this.isDarkTheme = newTheme === ThemeType.Dark;
      // Forçar a atualização dos estilos após a mudança de tema
      this.cdRef.detectChanges();
    });

    this.barraInferiorService.alturaBarraInferior$.subscribe(
      (altura: number) => {
        console.log('Altura recebida do serviço:', altura);
        this.updateContainerStyle(altura);
      }
    );
  }

  private updateContainerStyle(alturaBarraInferior: number): void {
    const alturaDisponivel = window.innerHeight - alturaBarraInferior;
    console.log('Altura disponível:', alturaDisponivel);
    const container = this.el.nativeElement.querySelector('.container');
    if (container) {
      this.renderer.setStyle(
        container,
        'min-height',
        `calc(100vh - ${alturaBarraInferior}px)`
      );
    }
  }
}
