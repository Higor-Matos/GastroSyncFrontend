import { Component } from '@angular/core';
import { ThemeService } from '../../../services/tema/theme.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'alternartema',
  templateUrl: './alternartema.component.html',
  styleUrls: ['./alternartema.component.scss'],
  animations: [
    trigger('rotate', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('default <=> rotated', animate('400ms ease-out')),
    ]),
  ],
})
export class AlterarTemaComponent {
  iconeTema = 'wb_sunny';
  rotateState: string = 'default';

  constructor(private themeService: ThemeService) {
    this.updateIcon();
  }

  alternartema(): void {
    this.themeService.toggleTheme();
    this.updateIcon();
    this.rotateState = this.rotateState === 'default' ? 'rotated' : 'default';
  }

  private updateIcon(): void {
    this.iconeTema = this.themeService.isDarkTheme()
      ? 'brightness_2'
      : 'wb_sunny';
  }
}
