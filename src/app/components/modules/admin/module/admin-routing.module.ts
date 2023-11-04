// src/app/components/modules/admin/admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MesasComponent } from '../mesas/mesas.component';
import { CardapioComponent } from '../../../shared/opcoesbarrainferior/cardapio/cardapio.component';
import { AjudaComponent } from '../../../shared/opcoesbarrainferior/ajuda/ajuda.component';
import { InicioComponent } from '../../../shared/opcoesbarrainferior/inicio/inicio.component';
import { CoverComponent } from '../cover/cover.component';

const routes: Routes = [
  { path: 'cardapio', component: CardapioComponent },
  { path: 'mesas', component: MesasComponent },
  { path: '', component: InicioComponent, pathMatch: 'full' },
  { path: 'cover', component: CoverComponent },
  { path: 'ajuda', component: AjudaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
