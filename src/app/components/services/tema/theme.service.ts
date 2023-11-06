import {
  Injectable,
  Renderer2,
  RendererFactory2,
  EventEmitter,
} from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

export enum ThemeType {
  Light = 'ifood-light-theme',
  Dark = 'ifood-dark-theme',
}

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = false;
  private renderer: Renderer2;
  public themeChanged = new EventEmitter<ThemeType>();

  constructor(
    private overlayContainer: OverlayContainer,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  getCurrentThemeClass(): ThemeType {
    return this.darkTheme ? ThemeType.Dark : ThemeType.Light;
  }

  toggleTheme(): void {
    this.darkTheme = !this.darkTheme;
    const themeClass = this.darkTheme ? ThemeType.Dark : ThemeType.Light;
    this.setTheme(themeClass);
    this.themeChanged.emit(this.darkTheme ? ThemeType.Dark : ThemeType.Light);
  }

  isDarkTheme(): boolean {
    return this.darkTheme;
  }

  private setTheme(theme: ThemeType): void {
    const classList = this.overlayContainer.getContainerElement().classList;
    const bodyClassList = document.body.classList;
    classList.remove(ThemeType.Light, ThemeType.Dark);
    bodyClassList.remove(ThemeType.Light, ThemeType.Dark);
    classList.add(theme);
    this.renderer.addClass(document.body, theme);
  }
}
