import { Injectable } from '@angular/core';

// icon.service.ts
@Injectable({ providedIn: 'root' })
export class IconService {
  private icons: { [key: string]: string } = {
    Comida: 'restaurant_menu',
    Bebida: 'local_cafe',
  };

  getCategoriaIcon(categoria: string): string {
    return this.icons[categoria] || 'default_icon';
  }
}
