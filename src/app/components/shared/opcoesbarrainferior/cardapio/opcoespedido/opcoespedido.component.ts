// opcoespedido.component.ts
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Produto } from '../../../models/produto.model'; // Ajuste o caminho conforme necessário
import {
  ThemeService,
  ThemeType,
} from '../../../../services/tema/theme.service'; // Ajuste o caminho para ThemeServices
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-opcoes-pedido',
  templateUrl: './opcoespedido.component.html',
  styleUrls: ['./opcoespedido.component.scss'], // Ajuste conforme necessário
})
export class OpcoespedidoComponent implements OnInit, OnDestroy {
  themeClass: string = ''; // Inicializando com uma string vazia
  private themeSubscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { produto: Produto },
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeClass = this.themeService.getCurrentThemeClass();
    this.themeSubscription = this.themeService.themeChanged.subscribe(
      (theme: ThemeType) => {
        this.themeClass = theme;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
