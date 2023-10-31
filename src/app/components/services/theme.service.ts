import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

type ThemeType = 'ifood-light-theme' | 'ifood-dark-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = false;

  constructor(private overlayContainer: OverlayContainer) {}

  toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    const themeClass = this.darkTheme
      ? 'ifood-dark-theme'
      : 'ifood-light-theme';
    this.setTheme(themeClass);
  }

  isDarkTheme(): boolean {
    return this.darkTheme;
  }

  private setTheme(theme: string) {
    const classList = this.overlayContainer.getContainerElement().classList;
    classList.remove('ifood-light-theme', 'ifood-dark-theme');
    classList.add(theme);
  }
}
