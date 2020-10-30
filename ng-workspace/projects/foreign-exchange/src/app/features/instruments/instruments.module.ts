import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentsRoutingModule } from './instruments-routing.module';
import { OrdersComponent } from './components/orders/orders.component';

import { AngularSplitModule } from 'angular-split';
import { LibMSTreeModule } from 'lib-mstree';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    InstrumentsRoutingModule,
    AngularSplitModule.forRoot(),
    LibMSTreeModule,
  ]
})
export class InstrumentsModule { }
