import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pr',
    pathMatch: 'full'
  },
  {
    path: 'pr',
    loadChildren: () => import('./../../features/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'or',
    loadChildren: () => import('./../../features/instruments/instruments.module').then(m => m.InstrumentsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
