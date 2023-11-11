// produto.component.ts
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Produto } from '../../../models/produto.model';
import { MatDialog } from '@angular/material/dialog';
import { OpcoespedidoComponent } from '../opcoespedido/opcoespedido.component';
import { BlurBackgroundService } from '../../../../services/blur/blurbackground.service';
import {
  ThemeService,
  ThemeType,
} from '../../../../services/tema/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProdutoComponent {
  @Input() produto!: Produto;
  private themeSubscription: Subscription | undefined;

  constructor(
    public dialog: MatDialog,
    private blurBackgroundService: BlurBackgroundService,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.themeSubscription = this.themeService.themeChanged.subscribe(
      (newTheme: ThemeType) => {
        // Forçar a verificação de mudanças
        this.cdr.detectChanges();
        console.log('Tema alterado para:', newTheme);
      }
    );
  }

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
      this.cdr.detectChanges();
      this.subscribeToThemeChanges();
    });
  }

  private subscribeToThemeChanges() {
    this.themeSubscription = this.themeService.themeChanged.subscribe(
      (newTheme: ThemeType) => {
        this.cdr.detectChanges();
      }
    );
  }
}
