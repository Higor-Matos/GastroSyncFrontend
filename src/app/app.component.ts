import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from './components/services/theme.service';
import { ClientOptionsPanelService } from './components/services/OptionsPanelService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GastroSyncFrontend';
  themeIcon = 'wb_sunny';

  constructor(
    private themeService: ThemeService,
    private clientOptionsPanelService: ClientOptionsPanelService,
    private renderer: Renderer2 // Injeção do Renderer2
  ) {
    // Definir o tema claro como padrão ao iniciar
    this.setTheme('ifood-light-theme');
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.themeIcon = this.themeService.isDarkTheme() ? 'moon' : 'sun';

    // Alternar entre os temas baseado no status do tema
    const themeClass = this.themeService.isDarkTheme()
      ? 'ifood-dark-theme'
      : 'ifood-light-theme';
    this.setTheme(themeClass);
  }

  openClientOptions(): void {
    this.clientOptionsPanelService.openClientOptions();
  }

  private setTheme(themeClass: string): void {
    if (themeClass === 'ifood-dark-theme') {
      this.renderer.removeClass(document.body, 'ifood-light-theme');
      this.renderer.addClass(document.body, 'ifood-dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'ifood-dark-theme');
      this.renderer.addClass(document.body, 'ifood-light-theme');
    }
  }
}
