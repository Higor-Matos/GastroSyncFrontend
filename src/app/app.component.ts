import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'GastroSyncFrontend';
  themeClass = 'ifood-light-theme';

  constructor(private overlayContainer: OverlayContainer) {
    this.setTheme(this.themeClass);
  }

  setTheme(theme: string) {
    this.themeClass = theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    classList.remove('ifood-light-theme', 'ifood-dark-theme');
    classList.add(theme);
  }

  toggleTheme() {
    this.setTheme(
      this.themeClass === 'ifood-light-theme'
        ? 'ifood-dark-theme'
        : 'ifood-light-theme'
    );
  }
}
