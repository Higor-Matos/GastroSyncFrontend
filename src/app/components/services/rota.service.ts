// rota.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ServicoDeNavegacao } from './servicodenavegacao.service';

@Injectable({
  providedIn: 'root',
})
export class RotaService {
  private _urlAtual: string = '';

  constructor(
    private router: Router,
    private servicodenavegacao: ServicoDeNavegacao
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this._urlAtual = event.urlAfterRedirects;
        this.servicodenavegacao.definirTipoUsuarioComBaseNaRota(this._urlAtual);
      }
    });
  }

  urlAtual(): string {
    return this._urlAtual;
  }
}
