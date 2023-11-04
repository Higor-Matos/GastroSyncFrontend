import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getProdutos(): Observable<any> {
    return this.http.get(this.url);
  }

  getImageUrl(id: number): string {
    return this.imageMap[id] || 'caminho_para_imagem_padrao.jpg';
  }
}
