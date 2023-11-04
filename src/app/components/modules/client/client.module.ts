import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { SharedModule } from '../../shared/shared.module';
import { PagamentosComponent } from './pagamentos/pagamentos.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [ClientComponent, PagamentosComponent],
  imports: [CommonModule, ClientRoutingModule, SharedModule],
})
export class ClientModule {}
