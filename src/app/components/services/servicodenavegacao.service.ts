import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServicoDeNavegacao {
  tipoUsuario: 'admin' | 'client' = 'client';

  definirTipoUsuarioComBaseNaRota(url: string): void {
    this.tipoUsuario = url.includes('admin') ? 'admin' : 'client';
  }

  obterOpcoesDeNavegacao(): any[] {
    let todasOpcoes = [];
    if (this.tipoUsuario === 'admin') {
      todasOpcoes = [
        {
          label: 'Cardápio',
          icone: 'restaurant_menu',
          rota: '/admin/cardapio',
        },
        { label: 'Mesas', icone: 'person_pin', rota: '/admin/mesas' },
        { label: 'Cover', icone: 'music_note', rota: '/admin/cover' },
        { label: 'Ajuda', icone: 'help_outline', rota: '/admin/ajuda' },
      ];
    } else {
      todasOpcoes = [
        {
          label: 'Cardápio',
          icone: 'restaurant_menu',
          rota: '/client/cardapio',
        },
        { label: 'Pedidos', icone: 'shopping_cart', rota: '/client/pedidos' },
        {
          label: 'Pagamentos',
          icone: 'attach_money',
          rota: '/client/pagamentos',
        },
        { label: 'Ajuda', icone: 'help_outline', rota: '/client/ajuda' },
      ];
    }
    return todasOpcoes;
  }
}
