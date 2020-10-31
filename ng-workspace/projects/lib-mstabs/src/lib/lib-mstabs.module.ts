import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { PortalModule } from '@angular/cdk/portal';
import { LibMSTabsComponent } from './lib-mstabs.component';
import { ContentContainerDirective } from './_directives/content-container.directive';
import { TabContentComponent } from './tab-content.component';
import { TestComponent } from './comps/test.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    LibMSTabsComponent,
    TabContentComponent,
    TestComponent,
    ContentContainerDirective,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    PortalModule,
    DragDropModule,
    A11yModule
  ],
  exports: [
    LibMSTabsComponent,
    TabContentComponent,
    TestComponent,
    ContentContainerDirective,
  ],
  entryComponents: [],
  providers: [],
  schemas: [
  ]
})
export class LibMstabsModule { }
