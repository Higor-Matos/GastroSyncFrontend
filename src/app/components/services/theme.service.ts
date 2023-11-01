import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

type ThemeType = 'ifood-light-theme' | 'ifood-dark-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = false;
  private renderer: Renderer2;

  constructor(
    private overlayContainer: OverlayContainer,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

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
    const bodyClassList = document.body.classList;
    classList.remove('ifood-light-theme', 'ifood-dark-theme');
    bodyClassList.remove('ifood-light-theme', 'ifood-dark-theme');
    classList.add(theme);
    this.renderer.addClass(document.body, theme);
  }
}
