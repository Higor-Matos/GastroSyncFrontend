// cardapio.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Categoria } from '../../models/produto.model';
import { ProdutoService } from '../../../services/cardapio/produto.service';
import { BarraInferiorService } from '../../../services/barrainferior/barrainferior.service';
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
  exibirOpcoesPedido: boolean = false;

  constructor(
    private produtoService: ProdutoService,
    private barraInferiorService: BarraInferiorService,
    public themeService: ThemeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.themeChanged.subscribe(
      (themeType: ThemeType) => {
        this.isDarkTheme = themeType === ThemeType.Dark;
        this.cdRef.detectChanges();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  trackByCategoria(index: number, categoria: Categoria): string {
    return categoria.nome;
  }

  mostrarOpcoesPedido() {
    this.exibirOpcoesPedido = true;
  }
}
