// client-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesaResolverGuard } from '../../../services/mesa/mesaresolverguard.service';

import { CardapioComponent } from '../../../shared/opcoesbarrainferior/cardapio/cardapio.component';
import { PedidosComponent } from '../pedidos/pedidos.component';
import { AjudaComponent } from '../../../shared/opcoesbarrainferior/ajuda/ajuda.component';
import { InicioComponent } from '../../../shared/opcoesbarrainferior/inicio/inicio.component';
import { PagamentosComponent } from '../pagamentos/pagamentos.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [MesaResolverGuard], // Adicionado o Guard aqui para a rota base
    children: [
      { path: 'cardapio', component: CardapioComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'pagamentos', component: PagamentosComponent },
      { path: 'ajuda', component: AjudaComponent },
      { path: '', component: InicioComponent, pathMatch: 'full' },
    ],
  },
  {
    path: ':mesa',
    canActivate: [MesaResolverGuard],
    children: [
      { path: 'cardapio', component: CardapioComponent },
      { path: 'pedidos', component: PedidosComponent },
      { path: 'pagamentos', component: PagamentosComponent },
      { path: 'ajuda', component: AjudaComponent },
      { path: '', component: InicioComponent, pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
