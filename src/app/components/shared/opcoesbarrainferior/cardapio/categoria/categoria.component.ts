// categoria.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Categoria } from '../../../models/produto.model';
import { ThemeService } from '../../../../services/tema/theme.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriaComponent {
  @Input() categoria!: Categoria;

  constructor(public themeService: ThemeService) {}
}
