import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocalMesaService } from './localmesa.service';
import { environment } from '../../../../app/environment/environment';
export interface Mesa {
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
  private baseUrl = `${environment.apiUrl}/Mesa`;

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
        if (res?.success && res?.data) {
          const numeroDaMesaAtual = this.obterNumeroDaMesa();
          return (
            res.data.find(
              (mesa: Mesa) => mesa.numeroMesa === numeroDaMesaAtual
            ) ?? null
          );
        }
        return null;
      })
    );
  }

  obterMesaEspecifica(): Observable<Mesa | null> {
    return this.obterTodasAsMesas().pipe(
      map((resposta: Mesa | null) => {
        if (!resposta) {
          console.error('Nenhuma mesa foi retornada pela API.');
          return null;
        }

        const mesas: Mesa[] = Array.isArray(resposta) ? resposta : [resposta];

        const numeroDaMesa = this.obterNumeroDaMesa();
        if (numeroDaMesa === null) {
          console.error('Número da mesa não definido.');
          return null;
        }

        const mesaEncontrada = mesas.find(
          (mesa: Mesa) => mesa.numeroMesa === numeroDaMesa
        );
        if (!mesaEncontrada) {
          console.error(`Mesa número ${numeroDaMesa} não encontrada.`);
          return null;
        }
        return mesaEncontrada;
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
