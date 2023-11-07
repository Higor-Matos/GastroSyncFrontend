// MesaResolverGuard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MesaService } from './mesa.service';

@Injectable({
  providedIn: 'root',
})
export class MesaResolverGuard implements CanActivate {
  constructor(private mesaService: MesaService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const numeroDaMesa = Number(
      route.paramMap.get('mesa')?.replace(/^\D+/g, '')
    );
    if (!isNaN(numeroDaMesa)) {
      return this.mesaService.criarMesa(numeroDaMesa).pipe(
        map((response) => {
          this.mesaService.armazenarNumeroDaMesa(numeroDaMesa);
          return true;
        }),
        catchError((error) => {
          console.error('Erro ao criar mesa:', error.message);
          return of(this.router.createUrlTree(['/client'])); // Redireciona para a rota base do cliente
        })
      );
    } else {
      return of(this.router.createUrlTree(['/client'])); // Redireciona para a rota base do cliente
    }
  }
}
