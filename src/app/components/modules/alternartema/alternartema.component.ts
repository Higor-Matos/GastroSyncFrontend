import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'alternartema',
  templateUrl: './alternartema.component.html',
  styleUrls: ['./alternartema.component.scss'],
})
export class AlterarTemaComponent {
  iconeTema = 'wb_sunny';

  constructor(private themeService: ThemeService) {
    this.updateIcon();
  }

  alternartema(): void {
    this.themeService.toggleTheme();
    this.updateIcon();
  }

  private updateIcon(): void {
    this.iconeTema = this.themeService.isDarkTheme()
      ? 'brightness_2'
      : 'wb_sunny';
  }

  get iconClass(): string {
    return this.themeService.isDarkTheme() ? 'mat-icon-dark' : '';
  }
}
