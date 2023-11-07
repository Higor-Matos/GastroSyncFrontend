// MesaService.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalMesaService } from './localmesa.service';

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private baseUrl = 'https://localhost:8443/api/Mesa/CriarMesa';

  constructor(
    private http: HttpClient,
    private localMesaService: LocalMesaService
  ) {}

  criarMesa(numeroDaMesa: number): Observable<any> {
    const local = this.localMesaService.obterLocal(numeroDaMesa);
    if (!local) {
      console.error('Local não encontrado para o número da mesa fornecido.');
      return of(null); // Tratar o valor nulo onde você se inscreve
    }
    const url = `${
      this.baseUrl
    }?numeromesa=${numeroDaMesa}&local=${encodeURIComponent(local)}`;
    // Se a API não requerer cabeçalhos específicos, você pode omitir o objeto 'options'
    const options = {
      headers: new HttpHeaders({
        // Se houver cabeçalhos específicos, como tokens, adicione-os aqui
      }),
    };

    return this.http
      .post(url, null, options)
      .pipe(catchError(this.handleError('criarMesa')));
  }

  armazenarNumeroDaMesa(numeroDaMesa: number): void {
    sessionStorage.setItem('numeroDaMesa', numeroDaMesa.toString());
  }

  obterNumeroDaMesa(): number {
    return Number(sessionStorage.getItem('numeroDaMesa'));
  }

  private handleError(operation = 'operation') {
    return (error: any): Observable<null> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(null); // Retornar um Observable nulo em caso de erro
    };
  }
}
