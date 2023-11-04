import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from './components/services/tema/theme.service';
import { ServicoDeNavegacao } from './components/services/navegacao/servicodenavegacao.service';

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
    private servicoDeNavegacao: ServicoDeNavegacao,
    private renderer: Renderer2
  ) {
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
    this.servicoDeNavegacao.obterOpcoesDeNavegacao();
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
