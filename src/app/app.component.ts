import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from './components/services/theme.service';
import { ServicoDeNavegacao } from './components/services/servicodenavegacao.service'; // Importe o novo serviço aqui

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
    private servicoDeNavegacao: ServicoDeNavegacao, // Substitua a injeção aqui
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
    // Aqui, pode ser necessário adaptar a lógica para abrir as opções do cliente, dependendo de como o novo serviço foi projetado
    // Por enquanto, estou apenas chamando o método para obter opções de navegação
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
