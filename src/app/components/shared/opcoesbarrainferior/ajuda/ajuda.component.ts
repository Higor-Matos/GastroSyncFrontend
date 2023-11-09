// ajuda.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { ThemeService, ThemeType } from '../../../services/tema/theme.service';
import { BarraInferiorService } from '../../../services/barrainferior/barrainferior.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ajuda',
  templateUrl: './ajuda.component.html',
  styleUrls: ['./ajuda.component.scss'],
})
export class AjudaComponent implements OnInit, OnDestroy {
  private themeSubscription: Subscription = new Subscription();
  private barraInferiorSubscription: Subscription = new Subscription(); // Mantenha o controle da assinatura

  constructor(
    private themeService: ThemeService,
    private barraInferiorService: BarraInferiorService, // Injete o BarraInferiorService
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.themeChanged.subscribe(
      (theme: ThemeType) => {
        this.renderer.removeClass(this.el.nativeElement, ThemeType.Light);
        this.renderer.removeClass(this.el.nativeElement, ThemeType.Dark);
        this.renderer.addClass(this.el.nativeElement, theme);
        this.renderer.setStyle(
          document.documentElement,
          '--altura-segura-topo',
          '20px'
        );
        this.renderer.setStyle(
          document.documentElement,
          '--altura-segura-topo',
          '20px'
        );
      }
    );

    this.barraInferiorSubscription =
      this.barraInferiorService.alturaBarraInferior$.subscribe((altura) => {
        // Use Renderer2 para definir o padding-bottom do elemento host
        this.renderer.setStyle(
          this.el.nativeElement,
          'padding-bottom',
          `${altura}px`
        );
      });

    const initialTheme = this.themeService.getCurrentThemeClass();
    this.renderer.addClass(this.el.nativeElement, initialTheme);
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.barraInferiorSubscription.unsubscribe(); // Não se esqueça de cancelar a assinatura
  }
}
