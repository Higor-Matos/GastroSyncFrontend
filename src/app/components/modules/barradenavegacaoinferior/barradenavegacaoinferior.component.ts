import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'barradenavegacaoinferior',
  templateUrl: './barradenavegacaoinferior.component.html',
  styleUrls: ['./barradenavegacaoinferior.component.scss'],
})
export class BarradeNavegacaoInferiorComponent implements OnInit {
  tipoUsuario: 'admin' | 'cliente' = 'cliente';
  opcoesEsquerda: any[] = [];
  opcoesDireita: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Configuração inicial com base na rota atual
    this.definirTipoUsuarioComBaseNaRota(this.router.url);

    // Adiciona um listener para mudanças de rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.definirTipoUsuarioComBaseNaRota(event.urlAfterRedirects);
      }
    });
  }

  private definirTipoUsuarioComBaseNaRota(url: string): void {
    this.tipoUsuario = url.includes('admin') ? 'admin' : 'cliente';
    this.definirOpcoesDeNavegacao();
  }

  private definirOpcoesDeNavegacao(): void {
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
          rota: '/cliente/cardapio',
        },
        { label: 'Pedidos', icone: 'shopping_cart', rota: '/cliente/pedidos' },
        {
          label: 'Pagamentos',
          icone: 'attach_money',
          rota: '/cliente/pagamentos',
        },
        { label: 'Ajuda', icone: 'help_outline', rota: '/cliente/ajuda' },
      ];
    }

    // Divida as opções em esquerda e direita
    this.opcoesEsquerda = todasOpcoes.slice(0, 2);
    this.opcoesDireita = todasOpcoes.slice(2);
  }
}
