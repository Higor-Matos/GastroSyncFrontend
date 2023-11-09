import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardapioComponent } from '../opcoesbarrainferior/cardapio/cardapio.component';
import { AjudaComponent } from '../opcoesbarrainferior/ajuda/ajuda.component';
import { InicioComponent } from '../opcoesbarrainferior/inicio/inicio.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [CardapioComponent, AjudaComponent, InicioComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  exports: [CardapioComponent, AjudaComponent, InicioComponent, MatMenuModule],
})
export class SharedModule {}
