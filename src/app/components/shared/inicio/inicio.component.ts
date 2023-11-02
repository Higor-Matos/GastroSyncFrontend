import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
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
    this.barraInferiorService.alturaBarraInferior$.subscribe(
      (altura: number) => {
        // Inscrição aqui
        this.alturaBarraInferior = altura;
      }
    );
  }
}
