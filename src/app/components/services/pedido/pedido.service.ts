// pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MesaService } from '../mesa/mesa.service';
import { ConsumidorService } from '../consumidor/consumidor.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private readonly baseUrl = 'http://localhost:8080/api/Pedido';

  constructor(
    private http: HttpClient,
    private mesaService: MesaService,
    private consumidorService: ConsumidorService
  ) {}

  fazerPedido(
    produtoId: number,
    onSuccess: () => void,
    onError: () => void
  ): void {
    const mesaId = this.mesaService.obterNumeroDaMesa(); // Supõe que esta função exista no MesaService
    const consumidoresIds =
      this.consumidorService.getIdsConsumidoresSelecionados(); // Supõe que esta função exista no ConsumidorService

    if (consumidoresIds.length === 0) {
      console.error('Nenhum consumidor selecionado.');
      return;
    }

    if (consumidoresIds.length === 1) {
      const url = `${this.baseUrl}/${mesaId}/Consumidores/${consumidoresIds[0]}`;
      const body = {
        ProdutoId: produtoId,
        Quantidade: 1,
      };

      this.http.post(url, body).subscribe({
        next: (response) => {
          console.log('Pedido realizado com sucesso:', response);
          onSuccess();
        },
        error: (error) => {
          console.error('Erro ao realizar pedido:', error);
          onError();
        },
      });
    } else {
      // Caso de múltiplos consumidores
      const url = `${this.baseUrl}/${mesaId}/Dividido`;
      const body = {
        produtoId: produtoId,
        quantidade: 1,
        consumidoresIds: consumidoresIds,
      };

      this.http.post(url, body).subscribe({
        next: (response) => {
          console.log('Pedido realizado com sucesso:', response);
          onSuccess();
        },
        error: (error) => {
          console.error('Erro ao realizar pedido:', error);
          onError();
        },
      });
    }
  }
}
