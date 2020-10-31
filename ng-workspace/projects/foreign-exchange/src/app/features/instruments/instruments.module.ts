import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentsRoutingModule } from './instruments-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AngularSplitModule } from 'angular-split';
import { LibMSTreeModule } from 'lib-mstree';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    InstrumentsRoutingModule,
    AngularSplitModule.forRoot(),
    LibMSTreeModule,
    MatCardModule,
    DragDropModule
  ]
})
export class InstrumentsModule { }
