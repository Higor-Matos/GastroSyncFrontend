import { Component } from '@angular/core';
import { ThemeService } from './components/services/theme.service';
import { ClientOptionsPanelService } from './components/services/client-options-panel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GastroSyncFrontend';

  constructor(
    private themeService: ThemeService,
    private clientOptionsPanelService: ClientOptionsPanelService
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  openClientOptions(): void {
    this.clientOptionsPanelService.openClientOptions();
  }
}
