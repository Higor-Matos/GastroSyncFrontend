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
        { label: 'Dashboard', icon: 'dashboard' },
        { label: 'Gerenciar Usuários', icon: 'people' },
        // ... outras opções para admin
      ];
    } else {
      this.navOptions = [
        { label: 'Menu', icon: 'restaurant_menu' },
        { label: 'Pedidos', icon: 'shopping_cart' },
        // ... outras opções para cliente
      ];
    }
  }
}
