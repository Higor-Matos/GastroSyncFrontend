import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/produto.model';
import { ProdutoService } from '../../../services/cardapio/produto.service';
import { BarraInferiorService } from '../../../services/barrainferior/barrainferior.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardapioComponent {
  categorias$: Observable<Categoria[]> = this.produtoService.getProdutos();
  alturaBarraInferior$: Observable<number> =
    this.barraInferiorService.alturaBarraInferior$;

  constructor(
    private produtoService: ProdutoService,
    private barraInferiorService: BarraInferiorService,
    private snackBar: MatSnackBar
  ) {}

  trackByCategoria(index: number, categoria: Categoria): string {
    return categoria.nome;
  }
}
