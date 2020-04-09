import { SecuredLoanComponent } from './components/secured-loan/secured-loan.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: SecuredLoanComponent,
    children: [
      {
        path: 'securedloan',
        component: SecuredLoanComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
