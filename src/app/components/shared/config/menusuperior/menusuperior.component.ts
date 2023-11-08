// menusuperior.component.ts

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
  temaClaro = true;
  private subscriptions = new Subscription();

  constructor(
    private themeService: ThemeService,
    private mesaService: MesaService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.mesaService.numeroDaMesaAtual$.subscribe(
        (numeroMesa) => (this.numeroMesa = numeroMesa)
      )
    );

    this.subscriptions.add(
      this.themeService.themeChanged.subscribe((theme) => {
        this.temaClaro = theme === ThemeType.Light;
        this.iconeTema = this.temaClaro ? 'wb_sunny' : 'brightness_2';
      })
    );

    this.obterNumeroMesa();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  alternarTema(): void {
    this.themeService.toggleTheme();
  }

  obterNumeroMesa(): void {
    this.numeroMesa = this.mesaService.obterNumeroDaMesa();
  }
}
