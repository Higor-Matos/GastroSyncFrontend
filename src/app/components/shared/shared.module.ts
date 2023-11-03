import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardapioComponent } from './cardapio/cardapio.component';
import { AjudaComponent } from './ajuda/ajuda.component';
import { InicioComponent } from './inicio/inicio.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [CardapioComponent, AjudaComponent, InicioComponent],
  imports: [CommonModule, MatCardModule, MatGridListModule],
  exports: [CardapioComponent, AjudaComponent, InicioComponent],
})
export class SharedModule {}
