import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { SecuredLoanComponent } from './components/secured-loan/secured-loan.component';
import { UnsecuredLoanComponent } from './components/unsecured-loan/unsecured-loan.component';


@NgModule({
  declarations: [
    SecuredLoanComponent,
    UnsecuredLoanComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
