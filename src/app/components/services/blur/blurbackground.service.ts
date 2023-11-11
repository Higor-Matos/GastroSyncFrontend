// blur-background.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlurBackgroundService {
  private blurElement: HTMLElement;

  constructor() {
    this.blurElement = document.createElement('div');
    this.blurElement.classList.add('blur-background');
  }

  enableBlur() {
    document.body.appendChild(this.blurElement);
    setTimeout(() => (this.blurElement.style.opacity = '1'), 0); // Torna visível
  }

  disableBlur() {
    this.blurElement.style.opacity = '0'; // Torna invisível
    setTimeout(() => document.body.removeChild(this.blurElement), 500); // Espera a animação terminar
  }
}
