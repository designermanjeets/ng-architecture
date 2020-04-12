import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentsRoutingModule } from './instruments-routing.module';
import { OrdersComponent } from './components/orders/orders.component';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    InstrumentsRoutingModule
  ]
})
export class InstrumentsModule { }
