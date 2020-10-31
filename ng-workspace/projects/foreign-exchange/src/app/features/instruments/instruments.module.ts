import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstrumentsRoutingModule } from './instruments-routing.module';
import { OrdersComponent } from './components/orders/orders.component';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AngularSplitModule } from 'angular-split';
import { LibMSTreeModule } from 'lib-mstree';
import { LibMstabsModule  } from 'lib-mstabs';
import { GraphsChartsComponent } from './components/graphs-charts/graphs-charts.component';


@NgModule({
  declarations: [
    OrdersComponent,
    GraphsChartsComponent
  ],
  imports: [
    CommonModule,
    InstrumentsRoutingModule,
    AngularSplitModule.forRoot(),
    LibMSTreeModule,
    LibMstabsModule,
    MatCardModule,
    DragDropModule
  ]
})
export class InstrumentsModule { }
