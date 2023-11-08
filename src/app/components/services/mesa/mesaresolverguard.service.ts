// mesa-resolver-guard.service.ts

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, timeoutWith } from 'rxjs/operators';
import { MesaService } from './mesa.service';

@Injectable({
  providedIn: 'root',
})
export class MesaResolverGuard implements CanActivate {
  constructor(private mesaService: MesaService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    // Primeiro verifica se um número de mesa é fornecido na rota
    const numeroDaMesa = Number(
      route.paramMap.get('mesa')?.replace(/^\D+/g, '')
    );

    // Se um número de mesa válido for fornecido, cria e armazena a mesa
    if (!isNaN(numeroDaMesa)) {
      return this.mesaService.criarMesa(numeroDaMesa).pipe(
        timeoutWith(3000, throwError(new Error('Timeout ao criar mesa'))),
        map((response) => {
          console.log('Mesa criada com sucesso:', numeroDaMesa);
          this.mesaService.armazenarNumeroDaMesa(numeroDaMesa);
          return true;
        }),
        catchError((error) => {
          console.error('Erro ao criar mesa:', error);
          return of(this.handleMesaError());
        })
      );
    }

    // Se não houver número de mesa na rota, verifica se há uma mesa armazenada na sessão
    const mesaSalva = this.mesaService.obterNumeroDaMesa();
    if (mesaSalva) {
      // Se uma mesa estiver salva, redireciona para ela
      console.log(`Redirecionando para a mesa salva: mesa${mesaSalva}`);
      return of(this.router.createUrlTree([`/client/mesa${mesaSalva}`]));
    }

    // Se não houver mesa na sessão, redireciona para o caminho padrão
    console.log(
      'Nenhum número de mesa fornecido, ativando a rota padrão /client'
    );
    return of(true);
  }

  // Método para tratar erros e redirecionar conforme necessário
  private handleMesaError(): UrlTree {
    console.error('Erro ao resolver mesa: redirecionando para /client');
    return this.router.createUrlTree(['/client']);
  }
}
