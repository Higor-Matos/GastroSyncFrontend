import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardapioComponent } from '../opcoesbarrainferior/cardapio/cardapio.component';
import { CategoriaComponent } from '../opcoesbarrainferior/cardapio/categoria/categoria.component';
import { ProdutoComponent } from '../opcoesbarrainferior/cardapio/produto/produto.component';
import { AjudaComponent } from '../opcoesbarrainferior/ajuda/ajuda.component';
import { InicioComponent } from '../opcoesbarrainferior/inicio/inicio.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    CardapioComponent,
    CategoriaComponent,
    ProdutoComponent,
    AjudaComponent,
    InicioComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
  ],
  exports: [
    CardapioComponent,
    CategoriaComponent,
    ProdutoComponent,
    AjudaComponent,
    InicioComponent,
    MatMenuModule,
  ],
})
export class SharedModule {}
