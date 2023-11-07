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
      return of(null);
    }
    const url = `${
      this.baseUrl
    }?numeromesa=${numeroDaMesa}&local=${encodeURIComponent(local)}`;
    const options = {
      headers: new HttpHeaders({
        // Adicione cabeçalhos específicos se necessário
      }),
    };

    return this.http
      .post(url, null, options)
      .pipe(catchError(this.handleError('criarMesa')));
  }

  armazenarNumeroDaMesa(numeroDaMesa: number): void {
    console.log(`Armazenando número da mesa: ${numeroDaMesa}`);
    localStorage.setItem('numeroDaMesa', numeroDaMesa.toString());
  }

  obterNumeroDaMesa(): number | null {
    const numeroDaMesa = localStorage.getItem('numeroDaMesa');
    if (numeroDaMesa) {
      console.log(`Número da mesa obtido: ${numeroDaMesa}`);
      return Number(numeroDaMesa);
    } else {
      console.log('Número da mesa não encontrado no armazenamento local.');
      return null;
    }
  }

  private handleError(operation = 'operation') {
    return (error: any): Observable<null> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(null);
    };
  }
}
