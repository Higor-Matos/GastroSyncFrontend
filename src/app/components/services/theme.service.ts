import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

type ThemeType = 'ifood-light-theme' | 'ifood-dark-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeClass: ThemeType = 'ifood-light-theme';

  constructor(private overlayContainer: OverlayContainer) {}

  setTheme(theme: ThemeType): void {
    this.themeClass = theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    classList.remove('ifood-light-theme', 'ifood-dark-theme');
    classList.add(theme);
  }

  toggleTheme(): void {
    this.setTheme(
      this.themeClass === 'ifood-light-theme'
        ? 'ifood-dark-theme'
        : 'ifood-light-theme'
    );
  }
}
