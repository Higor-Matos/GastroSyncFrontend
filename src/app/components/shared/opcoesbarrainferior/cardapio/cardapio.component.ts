// cardapio.component.ts

import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  Renderer2,
  ElementRef,
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
    public themeService: ThemeService, // Injetar o ThemeService
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    console.log('CardapioComponent construído');
  }

  ngOnInit(): void {
    console.log('CardapioComponent inicializado');
    this.logAppliedStyles();

    // Inscrever-se para mudanças de tema.
    this.themeSubscription = this.themeService.themeChanged.subscribe(
      (themeType: ThemeType) => {
        this.isDarkTheme = themeType === ThemeType.Dark;
        console.log('Tema alterado para:', themeType);
      }
    );
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

  private logAppliedStyles() {
    // Esta função tenta registrar os estilos computados do componente
    // Isto só funcionará se a view já estiver inicializada e os estilos aplicados
    setTimeout(() => {
      const componentStyles = getComputedStyle(this.el.nativeElement);
      console.log('Estilos computados do CardapioComponent:', componentStyles);
    }, 0);
  }
}
