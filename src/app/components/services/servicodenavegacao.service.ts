import { Injectable } from '@angular/core';

export enum UserType {
  Admin = 'admin',
  Client = 'client',
}

@Injectable({
  providedIn: 'root',
})
export class ServicoDeNavegacao {
  tipoUsuario: UserType = UserType.Client;

  definirTipoUsuarioComBaseNaRota(url: string): void {
    this.tipoUsuario = url.includes(UserType.Admin)
      ? UserType.Admin
      : UserType.Client;
  }

  obterOpcoesDeNavegacao(): any[] {
    return this.tipoUsuario === UserType.Admin
      ? this.getAdminOptions()
      : this.getClientOptions();
  }

  private getAdminOptions(): any[] {
    return [
      { label: 'Cardápio', icone: 'restaurant_menu', rota: '/admin/cardapio' },
      { label: 'Mesas', icone: 'person_pin', rota: '/admin/mesas' },
      { label: 'Cover', icone: 'music_note', rota: '/admin/cover' },
      { label: 'Ajuda', icone: 'help_outline', rota: '/admin/ajuda' },
    ];
  }

  private getClientOptions(): any[] {
    return [
      { label: 'Cardápio', icone: 'restaurant_menu', rota: '/client/cardapio' },
      { label: 'Pedidos', icone: 'shopping_cart', rota: '/client/pedidos' },
      {
        label: 'Pagamentos',
        icone: 'attach_money',
        rota: '/client/pagamentos',
      },
      { label: 'Ajuda', icone: 'help_outline', rota: '/client/ajuda' },
    ];
  }
}
