// rota.service.ts

import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RotaService {
  private urlAtualSource = new BehaviorSubject<string>('');

  constructor(private router: Router) {
    this.monitorarMudancasDeRota();
  }

  get urlAtual(): string {
    return this.urlAtualSource.value;
  }

  get onRouteChange() {
    return this.urlAtualSource.asObservable();
  }

  private monitorarMudancasDeRota(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.urlAtualSource.next(event.urlAfterRedirects);
      }
    });
  }
}
