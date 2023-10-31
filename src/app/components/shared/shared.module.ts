// src/app/components/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardapioComponent } from './cardapio/cardapio.component';
import { InicioComponent } from './inicio/inicio.component';
import { AjudaComponent } from './ajuda/ajuda.component';

@NgModule({
  declarations: [CardapioComponent, InicioComponent, AjudaComponent],
  imports: [CommonModule],
  exports: [CardapioComponent, InicioComponent, AjudaComponent],
})
export class SharedModule {}
