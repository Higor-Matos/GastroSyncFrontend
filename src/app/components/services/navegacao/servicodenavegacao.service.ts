// ServicoDeNavegacao.service.ts

import { Injectable } from '@angular/core';
import { MesaService } from '../mesa/mesa.service'; // Importe MesaService para acessar o número da mesa

export enum UserType {
  Admin = 'admin',
  Client = 'client',
}

export interface OpcaoNavegacao {
  label: string;
  icone: string;
  rota: string;
}

@Injectable({
  providedIn: 'root',
})
export class ServicoDeNavegacao {
  tipoUsuario: UserType = UserType.Client;

  constructor(private mesaService: MesaService) {}

  definirTipoUsuarioComBaseNaRota(url: string): void {
    this.tipoUsuario = url.includes('/admin')
      ? UserType.Admin
      : UserType.Client;
  }

  obterOpcoesDeNavegacao(): OpcaoNavegacao[] {
    const numeroDaMesa =
      this.tipoUsuario === UserType.Client
        ? this.mesaService.obterNumeroDaMesa()
        : null;
    const baseRoute = numeroDaMesa ? `/client/mesa${numeroDaMesa}` : '/client';

    return this.tipoUsuario === UserType.Admin
      ? this.getAdminOptions()
      : [
          {
            label: 'Cardápio',
            icone: 'restaurant_menu',
            rota: `${baseRoute}/cardapio`,
          },
          {
            label: 'Pedidos',
            icone: 'shopping_cart',
            rota: `${baseRoute}/pedidos`,
          },
          {
            label: 'Pagamentos',
            icone: 'attach_money',
            rota: `${baseRoute}/pagamentos`,
          },
          { label: 'Ajuda', icone: 'help_outline', rota: `${baseRoute}/ajuda` },
        ];
  }

  private getAdminOptions(): OpcaoNavegacao[] {
    return [
      { label: 'Cardápio', icone: 'restaurant_menu', rota: '/admin/cardapio' },
      { label: 'Mesas', icone: 'person_pin', rota: '/admin/mesas' },
      { label: 'Cover', icone: 'music_note', rota: '/admin/cover' },
      { label: 'Ajuda', icone: 'help_outline', rota: '/admin/ajuda' },
    ];
  }
}
