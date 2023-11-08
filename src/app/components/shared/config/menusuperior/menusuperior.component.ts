import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemeService, ThemeType } from '../../../services/tema/theme.service';
import { MesaService } from '../../../services/mesa/mesa.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-menu-superior',
  templateUrl: './menusuperior.component.html',
  styleUrls: ['./menusuperior.component.scss'],
})
export class MenuSuperiorComponent implements OnInit, OnDestroy {
  iconeTema = 'wb_sunny';
  numeroMesa: number | null = null;
  temaClaro = true; // Inicialmente definido como tema claro
  private mesaSubscription!: Subscription;

  constructor(
    private themeService: ThemeService,
    private mesaService: MesaService
  ) {}

  ngOnInit(): void {
    this.mesaSubscription = this.mesaService.numeroDaMesaAtual$.subscribe(
      (numeroMesa: number | null) => {
        this.numeroMesa = numeroMesa;
      }
    );
    this.obterNumeroMesa();
    this.atualizarEstadoTema();
    this.themeService.themeChanged.subscribe((theme: ThemeType) => {
      this.temaClaro = theme === ThemeType.Light;
      this.atualizarIconeTema();
    });
  }

  ngOnDestroy(): void {
    this.mesaSubscription.unsubscribe();
  }

  alternarTema(): void {
    this.themeService.toggleTheme();
  }

  private atualizarIconeTema(): void {
    this.iconeTema = this.themeService.isDarkTheme()
      ? 'brightness_2'
      : 'wb_sunny';
  }

  obterNumeroMesa(): void {
    this.numeroMesa = this.mesaService.obterNumeroDaMesa();
  }

  private atualizarEstadoTema(): void {
    this.temaClaro =
      this.themeService.getCurrentThemeClass() === ThemeType.Light;
    this.atualizarIconeTema();
  }
}
