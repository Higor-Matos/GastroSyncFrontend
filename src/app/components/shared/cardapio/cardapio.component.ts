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
  imageUrl?: string; // Opcional, caso você decida gerar a URL aqui
}

interface Categoria {
  nome: string;
  icon: string;
  produtos: Produto[];
}

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
})
export class CardapioComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.getProdutos().subscribe({
      next: (resposta: ProdutoResponse) => {
        if (resposta.success && Array.isArray(resposta.data)) {
          this.categorias = this.organizarCategorias(resposta.data);
        } else {
          console.error(
            'A resposta recebida não contém um array válido:',
            resposta
          );
        }
      },
      error: (err) =>
        console.error('Ocorreu um erro ao buscar os produtos:', err),
    });
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
        imageUrl: this.produtoService.getImageUrl(produto.id), // Garanta que esta função exista e retorne a URL
      });
    });
    return Array.from(categoriasMap.values());
  }

  private getCategoriaIcon(categoria: string): string {
    const icons: { [key: string]: string } = {
      Comida: 'restaurant_menu',
      Bebida: 'local_cafe',
      // Adicionar mais categorias e ícones conforme necessário
    };
    return icons[categoria] || 'default_icon';
  }
}
