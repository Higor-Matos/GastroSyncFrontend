import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent {
  isDarkTheme: boolean;

  constructor(private themeService: ThemeService) {
    this.isDarkTheme = this.themeService.isDarkTheme();
  }
}
