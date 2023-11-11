import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DescriptionService } from './description.service';
import {
  Produto,
  Categoria,
  ProdutoResponse,
} from '../../shared/models/produto.model';
import { ImageService } from './image.service';
import { IconService } from './icon.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private url = 'http://localhost:8080/api/Produto/RecuperarTodosProdutos';

  constructor(
    private http: HttpClient,
    private imageService: ImageService,
    private iconService: IconService,
    private descriptionService: DescriptionService
  ) {}

  getProdutos(): Observable<Categoria[]> {
    return this.http.get<ProdutoResponse>(this.url).pipe(
      map((response) =>
        response.success ? this.organizarCategorias(response.data) : []
      ),
      catchError(this.handleError<Categoria[]>('getProdutos', []))
    );
  }

  private organizarCategorias(produtos: Produto[]): Categoria[] {
    const categoriasMap = new Map<string, Categoria>();
    produtos.forEach((produto) => {
      if (!categoriasMap.has(produto.categoria)) {
        categoriasMap.set(produto.categoria, {
          nome: produto.categoria,
          icon: this.iconService.getCategoriaIcon(produto.categoria),
          produtos: [],
        });
      }
      const categoria = categoriasMap.get(produto.categoria);
      if (categoria) {
        categoria.produtos.push({
          ...produto,
          imageUrl: this.imageService.getImageUrl(produto.id),
          descricao: this.descriptionService.getDescription(produto.id),
          descricaoCurta: this.descriptionService.getShortDescription(
            this.descriptionService.getDescription(produto.id)
          ),
        });
      }
    });
    return Array.from(categoriasMap.values());
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
