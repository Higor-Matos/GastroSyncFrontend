import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { SharedModule } from '../../../shared/module/shared.module';
import { PagamentosComponent } from '../pagamentos/pagamentos.component';
import { MatCardModule } from '@angular/material/card';
import { TotalCardComponent } from '../pagamentos/totalcard/totalcard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ClientComponent, PagamentosComponent, TotalCardComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    MatCardModule,
    NgxChartsModule,
    FontAwesomeModule,
  ],
})
export class ClientModule {}
