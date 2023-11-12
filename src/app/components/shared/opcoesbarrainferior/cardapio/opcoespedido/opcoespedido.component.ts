// opcoespedido.component.ts
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Produto } from '../../../models/produto.model';
import {
  ThemeService,
  ThemeType,
} from '../../../../services/tema/theme.service';
import { DialogService } from '../../../../services/dialog/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-opcoes-pedido',
  templateUrl: './opcoespedido.component.html',
  styleUrls: ['./opcoespedido.component.scss'],
})
export class OpcoespedidoComponent implements OnInit, OnDestroy {
  themeClass: string = '';
  private themeSubscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { produto: Produto },
    private dialogRef: MatDialogRef<OpcoespedidoComponent>,
    private themeService: ThemeService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    console.log('OpcoespedidoComponent inicializado com dados:', this.data);

    this.themeClass = this.themeService.getCurrentThemeClass();
    this.themeSubscription = this.themeService.themeChanged.subscribe(
      (theme: ThemeType) => {
        this.themeClass = theme;
      }
    );
  }

  ngOnDestroy(): void {
    console.log('OpcoespedidoComponent destruído');

    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.dialogService.setDialogOpen(false);
  }

  fazerPedido(): void {
    // Lógica para realizar o pedido
    console.log('Pedido realizado!');
  }
}
