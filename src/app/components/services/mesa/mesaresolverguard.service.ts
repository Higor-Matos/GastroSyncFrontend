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
    const numeroDaMesa = Number(
      route.paramMap.get('mesa')?.replace(/^\D+/g, '')
    );

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
    } else {
      const mesaSalva = this.mesaService.obterNumeroDaMesa();
      if (mesaSalva) {
        console.log(`Redirecionando para a mesa salva: mesa${mesaSalva}`);
        return of(this.router.createUrlTree([`/client/mesa${mesaSalva}`]));
      } else {
        console.log(
          'Nenhuma mesa salva encontrada, redirecionando para /client'
        );
        // Adicionando um log antes do redirecionamento para confirmar a ação
        console.log('Preparando para redirecionar para /client');
        const urlTree = this.router.createUrlTree(['/client']);
        console.log('UrlTree criada:', urlTree);
        return of(urlTree);
      }
    }
  }

  private handleMesaError(): UrlTree {
    console.error('Erro ao resolver mesa: redirecionando para /client');
    // Adicionando um log para verificar se a mesa salva é recuperada corretamente
    const mesaSalva = this.mesaService.obterNumeroDaMesa();
    console.log('Mesa salva recuperada:', mesaSalva);
    return this.router.createUrlTree(
      mesaSalva ? [`/client/mesa${mesaSalva}`] : ['/client']
    );
  }
}
