// cardapio.component.ts

import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Categoria } from '../../models/produto.model';
import { ProdutoService } from '../../../services/cardapio/produto.service';
import { BarraInferiorService } from '../../../services/barrainferior/barrainferior.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ThemeService, ThemeType } from '../../../services/tema/theme.service';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardapioComponent implements OnInit, OnDestroy {
  categorias$: Observable<Categoria[]> = this.produtoService.getProdutos();
  alturaBarraInferior$: Observable<number> =
    this.barraInferiorService.alturaBarraInferior$;
  isDarkTheme: boolean = false;
  private themeSubscription!: Subscription;

  constructor(
    private produtoService: ProdutoService,
    private barraInferiorService: BarraInferiorService,
    private snackBar: MatSnackBar,
    private themeService: ThemeService // Injetar o ThemeService
  ) {
    console.log('CardapioComponent construído');
  }

  ngOnInit(): void {
    console.log('CardapioComponent inicializado');

    // Inscrever-se para mudanças de tema.
    this.themeSubscription = this.themeService.themeChanged.subscribe(
      (themeType: ThemeType) => {
        this.isDarkTheme = themeType === ThemeType.Dark;
        console.log('Tema alterado para:', themeType);
      }
    );

    // Subscrição para categorias e altura da barra inferior pode ser feita aqui
  }

  ngOnDestroy(): void {
    // Não esqueça de desinscrever-se para evitar vazamentos de memória!
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  trackByCategoria(index: number, categoria: Categoria): string {
    console.log(`Rastreando categoria: ${categoria.nome} no índice: ${index}`);
    return categoria.nome;
  }
}
