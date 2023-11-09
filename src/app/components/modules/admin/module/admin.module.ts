import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../../../shared/module/shared.module';
import { CoverComponent } from '../cover/cover.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms'; // Importe FormsModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importe MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importe MatInputModule
import { MatSlideToggleModule } from '@angular/material/slide-toggle'; // Importe MatSlideToggleModule

@NgModule({
  declarations: [CoverComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatCardModule,
    CommonModule,
    FormsModule, // Adicione FormsModule aqui
    MatFormFieldModule, // Adicione MatFormFieldModule aqui
    MatInputModule,
    MatSlideToggleModule, // Importe MatSlideToggleModule aqui
  ],
})
export class AdminModule {}
