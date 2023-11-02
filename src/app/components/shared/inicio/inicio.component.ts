import { Component, OnInit } from '@angular/core';
import { ThemeService, ThemeType } from '../../services/theme.service';
import { BarraInferiorService } from '../../services/barrainferior.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  isDarkTheme: boolean;
  alturaBarraInferior: number = 0;

  constructor(
    private themeService: ThemeService,
    private barraInferiorService: BarraInferiorService
  ) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }

  ngOnInit(): void {
    this.themeService.themeChanged.subscribe((newTheme: ThemeType) => {
      this.isDarkTheme = newTheme === ThemeType.Dark;
    });

    this.barraInferiorService.alturaBarraInferior$.subscribe(
      (altura: number) => {
        this.alturaBarraInferior = altura;
      }
    );
  }
}
