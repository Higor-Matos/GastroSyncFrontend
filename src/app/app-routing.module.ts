// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/modules/AdminPanel/admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./components/modules/ClientPanel/client/client.module').then(
        (m) => m.ClientModule
      ),
  },
  { path: '', redirectTo: '/client', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
