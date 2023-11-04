import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  Produto,
  Categoria,
  ProdutoResponse,
} from '../shared/models/produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  private url = 'https://localhost:8443/api/Produto/RecuperarTodosProdutos';
  private imageMap: { [key: number]: string } = {
    1: 'https://i.ibb.co/gW8BHP7/pizza.jpg',
    2: 'https://i.ibb.co/92yvPZF/Sushi.jpg',
    3: 'https://i.ibb.co/5n4J9YK/Macarr-o.jpg',
    4: 'https://i.ibb.co/qpk5ByM/Hamburger.jpg',
    5: 'https://i.ibb.co/gdqg4K5/Suco.jpg',
    6: 'https://i.ibb.co/KKV9GtC/gua.jpg',
    7: 'https://i.ibb.co/kxwwz3Z/Refrigerante.jpg',
    8: 'https://i.ibb.co/WzJn0br/Cerveja.jpg',
  };

  constructor(private http: HttpClient) {}

  getProdutos(): Observable<Categoria[]> {
    return this.http.get<ProdutoResponse>(this.url).pipe(
      map((response) =>
        response.success ? this.organizarCategorias(response.data) : []
      ),
      catchError((error) => {
        console.error('Erro ao obter produtos:', error);
        return of([]);
      })
    );
  }

  getImageUrl(id: number): string {
    return this.imageMap[id] || 'erro.jpg';
  }

  private organizarCategorias(produtos: Produto[]): Categoria[] {
    const categoriasMap = new Map<string, Categoria>();
    produtos.forEach((produto) => {
      if (!categoriasMap.has(produto.categoria)) {
        categoriasMap.set(produto.categoria, {
          nome: produto.categoria,
          icon: this.getCategoriaIcon(produto.categoria),
          produtos: [],
        });
      }
      categoriasMap.get(produto.categoria)?.produtos.push({
        ...produto,
        imageUrl: this.getImageUrl(produto.id),
      });
    });
    return Array.from(categoriasMap.values());
  }

  private getCategoriaIcon(categoria: string): string {
    const icons: { [key: string]: string } = {
      Comida: 'restaurant_menu',
      Bebida: 'local_cafe',
    };
    return icons[categoria] || 'default_icon';
  }
}
