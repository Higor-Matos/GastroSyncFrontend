// src/app/components/modules/client/client-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CardapioComponent } from '../../shared/cardapio/cardapio.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AjudaComponent } from '../../shared/ajuda/ajuda.component';
import { InicioComponent } from '../../shared/inicio/inicio.component';
import { PagamentosComponent } from './pagamentos/pagamentos.component';

const routes: Routes = [
  { path: 'cardapio', component: CardapioComponent },
  { path: 'pedidos', component: PedidosComponent },
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'pagamentos', component: PagamentosComponent },
  { path: 'ajuda', component: AjudaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
