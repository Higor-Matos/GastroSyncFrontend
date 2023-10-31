import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-bottom-nav-bar',
  templateUrl: './bottom-nav-bar.component.html',
  styleUrls: ['./bottom-nav-bar.component.scss'],
})
export class BottomNavBarComponent implements OnInit {
  userType: 'admin' | 'client' = 'client';
  navOptions: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Configuração inicial com base na rota atual
    this.setUserTypeBasedOnRoute(this.router.url);

    // Adiciona um listener para mudanças de rota
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setUserTypeBasedOnRoute(event.urlAfterRedirects);
      }
    });
  }

  private setUserTypeBasedOnRoute(url: string): void {
    this.userType = url.includes('admin') ? 'admin' : 'client';
    this.setNavOptions();
  }

  private setNavOptions(): void {
    if (this.userType === 'admin') {
      this.navOptions = [
        {
          label: 'Cardápio',
          icon: 'restaurant_menu',
          route: '/admin/cardapio',
        },
        { label: 'Mesas', icon: 'person_pin', route: '/admin/mesas' },
        { label: 'Cover', icon: 'music_note', route: '/admin/cover' },
        { label: 'Ajuda', icon: 'help_outline', route: '/admin/ajuda' },
      ];
    } else {
      this.navOptions = [
        {
          label: 'Cardápio',
          icon: 'restaurant_menu',
          route: '/cliente/cardapio',
        },
        { label: 'Pedidos', icon: 'shopping_cart', route: '/cliente/pedidos' },
        {
          label: 'Pagamentos',
          icon: 'attach_money',
          route: '/cliente/pagamentos',
        },
        { label: 'Ajuda', icon: 'help_outline', route: '/cliente/ajuda' },
      ];
    }
  }
}
