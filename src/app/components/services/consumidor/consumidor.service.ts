// ConsumidorService.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { MesaService } from '../mesa/mesa.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConsumidorService {
  private baseUrl = 'http://localhost:8080/api/Consumidor';
  private idsSelecionadosSource = new BehaviorSubject<number[]>([]);
  public idsSelecionados$ = this.idsSelecionadosSource.asObservable();

  constructor(private http: HttpClient, private mesaService: MesaService) {}

  getIdsConsumidoresSelecionados(): number[] {
    return this.idsSelecionadosSource.value;
  }

  selecionarConsumidor(consumidorId: number): void {
    const idsAtualizados = this.idsSelecionadosSource.value.includes(
      consumidorId
    )
      ? this.idsSelecionadosSource.value.filter((id) => id !== consumidorId)
      : [...this.idsSelecionadosSource.value, consumidorId];

    this.idsSelecionadosSource.next(idsAtualizados);
  }

  limparSelecao(): void {
    this.idsSelecionadosSource.next([]);
  }

  adicionarConsumidoresMesa(consumidores: string[]): Observable<any> {
    const numeroDaMesa = this.mesaService.obterNumeroDaMesa();
    if (numeroDaMesa === null) {
      console.error('Número da mesa não encontrado.');
      return of(null);
    }
    const url = `${this.baseUrl}/${numeroDaMesa}/AdicionarConsumidoresMesa`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(consumidores);

    return this.http.post(url, body, { headers }).pipe(
      tap(() => {
        this.mesaService.obterTodasAsMesas().subscribe((mesaAtualizada) => {
          if (mesaAtualizada?.consumidores) {
            this.mesaService.atualizarConsumidores(mesaAtualizada.consumidores);
          }
        });
      })
    );
  }
}
