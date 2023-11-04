import {
  Component,
  OnInit,
  HostListener,
  ChangeDetectionStrategy,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/produto.model';
import { ProdutoService } from '../../../services/cardapio/produto.service';
import { BarraInferiorService } from '../../../services/barrainferior/barrainferior.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatExpansionPanel } from '@angular/material/expansion';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardapioComponent implements OnInit {
  categorias$: Observable<Categoria[]> = this.produtoService.getProdutos();
  alturaBarraInferior$: Observable<number> =
    this.barraInferiorService.alturaBarraInferior$;
  isMobile: boolean = window.innerWidth < 768;

  constructor(
    private produtoService: ProdutoService,
    private barraInferiorService: BarraInferiorService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.checkIfMobile();
  }

  @ViewChildren(MatExpansionPanel) panels!: QueryList<MatExpansionPanel>;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkIfMobile();
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  isPanelOpen(index: number): boolean {
    const panel = this.panels.toArray()[index];
    // A propriedade correta é 'expanded', que é um booleano, e não 'opened'.
    return panel ? panel.expanded : false;
  }

  togglePanel(panel: MatExpansionPanel) {
    panel.toggle(); // Isso alternará o estado de expansão do painel
  }

  trackByCategoria(index: number, categoria: Categoria): string {
    return categoria.nome;
  }
}
