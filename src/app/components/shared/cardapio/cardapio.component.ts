import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';

interface ProdutoResponse {
  success: boolean;
  message: string;
  data: Produto[];
}

interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
}

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
})
export class CardapioComponent implements OnInit {
  produtos: Produto[] = [];
  comidas: Produto[] = [];
  bebidas: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.produtoService.getProdutos().subscribe((response: ProdutoResponse) => {
      if (response.success) {
        this.produtos = response.data;
        this.comidas = this.produtos.filter(
          (produto) => produto.categoria === 'Comida'
        );
        this.bebidas = this.produtos.filter(
          (produto) => produto.categoria === 'Bebida'
        );
      }
    });
  }

  getImageUrl(id: number): string {
    const imageMap: { [key: number]: string } = {
      1: 'https://i.ibb.co/gW8BHP7/pizza.jpg',
      2: 'https://i.ibb.co/92yvPZF/Sushi.jpg',
      3: 'https://i.ibb.co/5n4J9YK/Macarr-o.jpg',
      4: 'https://i.ibb.co/qpk5ByM/Hamburger.jpg',
      5: 'https://i.ibb.co/gdqg4K5/Suco.jpg',
      6: 'https://i.ibb.co/KKV9GtC/gua.jpg',
      7: 'https://i.ibb.co/kxwwz3Z/Refrigerante.jpg',
      8: 'https://i.ibb.co/WzJn0br/Cerveja.jpg',
    };
    return imageMap[id] || 'caminho_para_imagem_padrao.jpg';
  }
}
