import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProdutoService } from '../../services/produto.service';
import { BarraInferiorService } from '../../services/barrainferior.service';

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
  imageUrl?: string;
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
export class CardapioComponent implements OnInit, OnDestroy {
  categorias: Categoria[] = [];
  private alturaBarraInferiorSubscription!: Subscription;
  alturaBarraInferior: number = 0;

  constructor(
    private produtoService: ProdutoService,
    private barraInferiorService: BarraInferiorService
  ) {}

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
      error: (err) => {
        console.error('Ocorreu um erro ao buscar os produtos:', err);
      },
    });

    this.alturaBarraInferiorSubscription =
      this.barraInferiorService.alturaBarraInferior$.subscribe((altura) => {
        this.alturaBarraInferior = altura;
      });
  }

  ngOnDestroy(): void {
    this.alturaBarraInferiorSubscription.unsubscribe();
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
