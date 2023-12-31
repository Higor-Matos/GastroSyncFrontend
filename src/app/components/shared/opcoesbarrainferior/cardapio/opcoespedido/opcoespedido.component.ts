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
import { PedidoService } from '../../../../services//pedido/pedido.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-opcoes-pedido',
  templateUrl: './opcoespedido.component.html',
  styleUrls: ['./opcoespedido.component.scss'],
})
export class OpcoespedidoComponent implements OnInit, OnDestroy {
  themeClass: string = '';
  private themeSubscription: Subscription = new Subscription();
  pedidoSucesso: boolean = false;
  isPedidoEmAndamento: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { produto: Produto },
    private dialogRef: MatDialogRef<OpcoespedidoComponent>,
    private themeService: ThemeService,
    private dialogService: DialogService,
    private toastr: ToastrService,
    private pedidoService: PedidoService
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

  fazerPedido(): void {
    if (this.isPedidoEmAndamento) {
      return;
    }

    this.isPedidoEmAndamento = true;

    const produtoId = this.data.produto.id;
    this.pedidoService.fazerPedido(
      produtoId,
      () => {
        this.toastr.success('Pedido realizado com sucesso!');
        this.pedidoSucesso = true;
        setTimeout(() => {
          this.pedidoSucesso = false;
          this.closeDialog();
        }, 3000);
      },
      () => {
        this.toastr.error('Erro ao realizar pedido!');
        this.isPedidoEmAndamento = false;
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.dialogService.setDialogOpen(false);
    this.isPedidoEmAndamento = false;
  }
}
