// categoria.component.ts
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Categoria } from '../../../models/produto.model';
import { ThemeService } from '../../../../services/tema/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriaComponent implements OnDestroy {
  @Input() categoria!: Categoria;
  private themeSubscription: Subscription;

  constructor(
    public themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {
    this.themeSubscription = this.themeService.themeChanged.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  public atualizarAposDialogoFechado(): void {
    this.cdr.markForCheck();
  }
}
