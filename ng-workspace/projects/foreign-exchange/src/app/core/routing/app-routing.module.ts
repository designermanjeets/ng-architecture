import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../../../../lib-mslogin/src/lib/auth/_services/auth.guard';
import { LoginShellComponent } from './../../shared/login/loginshell.component';
import { DashboardComponent } from '../../features/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'pr',
    loadChildren: () => import('./../../features/products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'or',
    loadChildren: () => import('./../../features/instruments/instruments.module').then(m => m.InstrumentsModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginShellComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
