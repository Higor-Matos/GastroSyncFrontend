import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-toggle-theme',
  templateUrl: './toggle-theme.component.html',
  styleUrls: ['./toggle-theme.component.scss'],
})
export class ToggleThemeComponent {
  themeIcon = 'wb_sunny';

  constructor(private themeService: ThemeService) {
    this.updateIcon();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.updateIcon();
  }

  private updateIcon(): void {
    this.themeIcon = this.themeService.isDarkTheme()
      ? 'brightness_2'
      : 'wb_sunny';
  }
}
