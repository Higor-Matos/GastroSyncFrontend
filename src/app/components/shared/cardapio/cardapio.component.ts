import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ProdutoService } from '../../services/produto.service';
import { BarraInferiorService } from '../../services/barrainferior.service';
import { Produto, ProdutoResponse, Categoria } from '../models/produto.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
})
export class CardapioComponent implements OnInit, OnDestroy {
  categorias: Categoria[] = [];
  private destroy$ = new Subject<void>();
  alturaBarraInferior: number = 0;

  constructor(
    private produtoService: ProdutoService,
    private barraInferiorService: BarraInferiorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.produtoService
      .getProdutos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ProdutoResponse) => {
          if (response.success) {
            this.categorias = this.organizarCategorias(response.data);
          } else {
            this.handleError(response.message);
          }
        },
        error: (err) => this.handleError(err),
      });

    this.barraInferiorService.alturaBarraInferior$
      .pipe(takeUntil(this.destroy$))
      .subscribe((altura) => {
        this.alturaBarraInferior = altura;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
        imageUrl: this.produtoService.getImageUrl(produto.id),
      });
    });
    return Array.from(categoriasMap.values());
  }

  private handleError(error: any): void {
    console.error('An error occurred:', error);

    this.snackBar.open(
      'Desculpe, ocorreu um erro. Tente novamente mais tarde.',
      'Fechar',
      {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }
    );
  }

  trackByCategory(index: number, category: Categoria): string {
    return category.nome;
  }

  private getCategoriaIcon(categoria: string): string {
    const icons: { [key: string]: string } = {
      Comida: 'restaurant_menu',
      Bebida: 'local_cafe',
    };
    return icons[categoria] || 'default_icon';
  }
}
