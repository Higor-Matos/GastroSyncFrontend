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
  }

  disableBlur() {
    document.body.removeChild(this.blurElement);
  }
}
