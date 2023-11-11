// ConsumidorService.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MesaService } from './mesa/mesa.service';

@Injectable({
  providedIn: 'root',
})
export class ConsumidorService {
  private baseUrl = 'http://localhost:8080/api/Consumidor';

  constructor(private http: HttpClient, private mesaService: MesaService) {}

  adicionarConsumidoresMesa(consumidores: string[]): Observable<any> {
    const numeroDaMesa = this.mesaService.obterNumeroDaMesa();
    if (numeroDaMesa === null) {
      console.error('Número da mesa não encontrado.');
      return of(null);
    }
    const url = `${this.baseUrl}/${numeroDaMesa}/AdicionarConsumidoresMesa`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(consumidores);

    return this.http.post(url, body, { headers });
  }
}
