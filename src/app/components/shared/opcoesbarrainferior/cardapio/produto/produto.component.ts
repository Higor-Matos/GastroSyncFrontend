// produto.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Produto } from '../../../models/produto.model';
import { MatDialog } from '@angular/material/dialog';
import { OpcoespedidoComponent } from '../opcoespedido/opcoespedido.component'; // Ajuste o caminho conforme necessário

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutoComponent {
  @Input() produto!: Produto;

  constructor(public dialog: MatDialog) {}

  // produto.component.ts
  // produto.component.ts
  abrirOpcoesPedido() {
    console.log('Abrindo diálogo para o produto:', this.produto);

    let dialogJustOpened = true;

    const dialogRef = this.dialog.open(OpcoespedidoComponent, {
      data: { produto: this.produto },
      disableClose: false,
      hasBackdrop: true,
    });

    dialogRef.afterOpened().subscribe(() => {
      // Muda a flag para false após a abertura do diálogo
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

    // Adiciona o listener depois que o diálogo é aberto
    setTimeout(() => {
      document.body.addEventListener('click', clickListener);
    }, 0);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo fechado com resultado:', result);
      document.body.removeEventListener('click', clickListener);
    });
  }
}
