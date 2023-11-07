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
    // Tenta extrair apenas o número do parâmetro da rota
    const numeroDaMesa = Number(
      route.paramMap.get('mesa')?.replace(/^\D+/g, '')
    );
    console.log('Valor numérico do parâmetro mesa:', numeroDaMesa);

    if (!isNaN(numeroDaMesa)) {
      return this.mesaService.criarMesa(numeroDaMesa).pipe(
        map((response) => {
          this.mesaService.armazenarNumeroDaMesa(numeroDaMesa);
          console.log(
            'Mesa criada e número armazenado na sessão:',
            numeroDaMesa
          );
          return true;
        }),
        catchError((error) => {
          console.error('Erro ao criar mesa:', error.message);
          this.router.navigate(['/']); // Redireciona para a rota padrão ou de erro se necessário
          return of(false);
        })
      );
    } else {
      console.warn('Número da mesa inválido:', numeroDaMesa);
      this.router.navigate(['/']); // Redireciona para a rota padrão ou de erro se necessário
      return of(false);
    }
  }
}
