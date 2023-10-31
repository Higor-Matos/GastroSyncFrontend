import { Component } from '@angular/core';
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
    private clientOptionsPanelService: ClientOptionsPanelService
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.themeIcon = this.themeService.isDarkTheme() ? 'moon' : 'sun';
  }

  openClientOptions(): void {
    this.clientOptionsPanelService.openClientOptions();
  }
}
