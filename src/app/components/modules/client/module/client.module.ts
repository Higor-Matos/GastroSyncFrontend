import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { SharedModule } from '../../../shared/module/shared.module';
import { PagamentosComponent } from '../pagamentos/pagamentos.component';
import { MatCardModule } from '@angular/material/card';
import { TotalCardComponent } from '../pagamentos/totalcard/totalcard.component';

@NgModule({
  declarations: [ClientComponent, PagamentosComponent, TotalCardComponent],
  imports: [CommonModule, ClientRoutingModule, SharedModule, MatCardModule],
  exports: [TotalCardComponent],
})
export class ClientModule {}
