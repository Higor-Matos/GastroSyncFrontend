import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { SharedModule } from '../../../shared/module/shared.module';
import { PagamentosComponent } from '../pagamentos/pagamentos.component';

@NgModule({
  declarations: [ClientComponent, PagamentosComponent],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
})
export class ClientModule {}
