// produto.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Produto } from '../../../models/produto.model';
import { MatDialog } from '@angular/material/dialog';
import { OpcoespedidoComponent } from '../opcoespedido/opcoespedido.component';
import { BlurBackgroundService } from '../../../../services/blur/blurbackground.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutoComponent {
  @Input() produto!: Produto;

  constructor(
    public dialog: MatDialog,
    private blurBackgroundService: BlurBackgroundService
  ) {}

  abrirOpcoesPedido() {
    console.log('Abrindo diálogo para o produto:', this.produto);

    let dialogJustOpened = true;
    this.blurBackgroundService.enableBlur();
    const dialogRef = this.dialog.open(OpcoespedidoComponent, {
      data: { produto: this.produto },
      disableClose: false,
      hasBackdrop: true,
    });

    dialogRef.afterOpened().subscribe(() => {
      dialogJustOpened = false;
    });

    const clickListener = (event: MouseEvent) => {
      if (dialogJustOpened) {
        return;
      }

      const target = event.target as Element;
      if (target?.closest('.cdk-overlay-container')) {
        return;
      }

      dialogRef.close();
      document.body.removeEventListener('click', clickListener);
    };

    setTimeout(() => {
      document.body.addEventListener('click', clickListener);
    }, 0);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo fechado com resultado:', result);
      document.body.removeEventListener('click', clickListener);
      this.blurBackgroundService.disableBlur();
    });
  }
}
