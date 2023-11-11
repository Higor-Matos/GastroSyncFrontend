// avatar.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  private avataresOriginais: string[] = [
    'https://cdn-icons-png.flaticon.com/512/11891/11891916.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891899.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891893.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891927.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891890.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891907.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891902.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891896.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891920.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891929.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891884.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891873.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891912.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891887.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891878.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891876.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891882.png',
    'https://cdn-icons-png.flaticon.com/512/11891/11891923.png',
  ];

  private avataresDisponiveis: string[] = [...this.avataresOriginais];

  obterAvatarAleatorio(): string {
    if (this.avataresDisponiveis.length === 0) {
      this.avataresDisponiveis = [...this.avataresOriginais];
    }

    const indiceAleatorio = Math.floor(
      Math.random() * this.avataresDisponiveis.length
    );
    const avatarEscolhido = this.avataresDisponiveis[indiceAleatorio];

    // Remove o avatar escolhido da lista de disponíveis
    this.avataresDisponiveis.splice(indiceAleatorio, 1);

    return avatarEscolhido;
  }
}
