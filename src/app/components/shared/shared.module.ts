// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardapioComponent } from './cardapio/cardapio.component';
import { AjudaComponent } from './ajuda/ajuda.component';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [CardapioComponent, AjudaComponent, InicioComponent],
  imports: [CommonModule],
  exports: [CardapioComponent, AjudaComponent, InicioComponent],
})
export class SharedModule {}
