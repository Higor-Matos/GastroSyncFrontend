// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/modules/admin/admin.module').then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./components/modules/client/client.module').then(
        (m) => m.ClientModule
      ),
  },
  { path: '', redirectTo: '/client', pathMatch: 'full' },
  { path: '**', redirectTo: '/client' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
