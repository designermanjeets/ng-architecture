import { UnsecuredLoanComponent } from './components/unsecured-loan/unsecured-loan.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecuredLoanComponent } from './components/secured-loan/secured-loan.component';

const routes: Routes = [
  {
    path: '',
    component: SecuredLoanComponent,
  },
  {
    path: 'securedloan',
    component: SecuredLoanComponent
  },
  {
    path: 'unsecuredloan',
    component: UnsecuredLoanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
