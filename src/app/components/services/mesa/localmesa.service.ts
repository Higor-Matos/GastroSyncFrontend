// LocalMesaService.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalMesaService {
  private locais: { [key: number]: string } = {
    1: 'Terraço',
    2: 'Jardim',
    3: '2º ANDAR',
    4: 'Jardim',
    5: 'Salão Principal',
    6: 'Bar',
    7: 'Lounge',
    8: 'Área VIP',
    9: 'Pátio',
    10: 'Varanda',
    11: 'Espaço Externo',
    12: 'Área de Jogos',
    13: 'Cantina',
    14: 'Sala de Reuniões',
    15: 'Área de Dança',
    16: 'Palco',
    17: 'Mezanino',
    18: 'Quiosque',
    19: 'Piscina',
    20: 'Área de Churrasco',
  };

  constructor() {}

  obterLocal(numeroDaMesa: number): string | undefined {
    return this.locais[numeroDaMesa];
  }

  obterTodosOsLocais(): { [numero: number]: string } {
    return this.locais;
  }
}
