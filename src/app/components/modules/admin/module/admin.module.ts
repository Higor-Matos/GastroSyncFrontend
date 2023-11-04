import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../../shared/module/shared.module';
import { CoverComponent } from '../cover/cover.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [CoverComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
