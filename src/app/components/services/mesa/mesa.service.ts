// MesaService.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocalMesaService } from './localmesa.service';
interface Mesa {
  id: number;
  numeroMesa: number;
  local: string;
  consumidores: Array<any>;
  totalConsumidoMesa: number;
}

@Injectable({
  providedIn: 'root',
})
export class MesaService {
  private baseUrl = 'http://localhost:8080/api/Mesa';

  constructor(
    private http: HttpClient,
    private localMesaService: LocalMesaService
  ) {}

  private consumidoresAtualizadosSource = new BehaviorSubject<any[]>([]);
  consumidoresAtualizados$ = this.consumidoresAtualizadosSource.asObservable();

  atualizarConsumidores(consumidores: any[]) {
    this.consumidoresAtualizadosSource.next(consumidores);
  }

  criarMesa(numeroDaMesa: number): Observable<any> {
    const local = this.localMesaService.obterLocal(numeroDaMesa);
    if (!local) {
      console.error('Local não encontrado para o número da mesa fornecido.');
      return of(null);
    }
    const url = `${
      this.baseUrl
    }/CriarMesa?numeromesa=${numeroDaMesa}&local=${encodeURIComponent(local)}`;
    const options = {
      headers: new HttpHeaders({}),
    };

    return this.http
      .post(url, null, options)
      .pipe(catchError(this.handleError('criarMesa')));
  }

  private numeroDaMesaSource = new BehaviorSubject<number | null>(
    this.obterNumeroDaMesa()
  );
  numeroDaMesaAtual$ = this.numeroDaMesaSource.asObservable();

  armazenarNumeroDaMesa(numeroDaMesa: number): void {
    console.log(`Armazenando número da mesa: ${numeroDaMesa}`);
    localStorage.setItem('numeroDaMesa', numeroDaMesa.toString());
    this.numeroDaMesaSource.next(numeroDaMesa);
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

  obterTodasAsMesas(): Observable<Mesa | null> {
    const url = `${this.baseUrl}/ObterTodasAsMesas`;
    return this.http.get<{ success: boolean; data: Mesa[] }>(url).pipe(
      catchError(this.handleError('obterTodasAsMesas')),
      map((res) => {
        if (res && res.success && res.data) {
          const numeroDaMesaAtual = this.obterNumeroDaMesa();
          // Retorna null se a mesa não for encontrada
          return (
            res.data.find(
              (mesa: Mesa) => mesa.numeroMesa === numeroDaMesaAtual
            ) || null
          );
        }
        return null;
      })
    );
  }

  private handleError(operation = 'operation') {
    return (error: any): Observable<null> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(null);
    };
  }
}
