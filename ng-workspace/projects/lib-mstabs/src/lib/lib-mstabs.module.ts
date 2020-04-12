import { MS_PORTAL_DATA, tabInjector, TabInjClass, injectorTokens } from './_services/tabs.injector';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { LibMSTabsComponent } from './lib-mstabs.component';
import { ContentContainerDirective } from './_directives/content-container.directive';
import { LibMSTabsService } from './_services/lib-mstabs.service';
import { TabContentComponent } from './tab-content.component';
import { PortalModule } from '@angular/cdk/portal';
import { TestComponent } from './comps/test.component';



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
    PortalModule
  ],
  exports: [
    LibMSTabsComponent,
    TestComponent
  ],
  entryComponents: [],
  providers: [LibMSTabsService, { provide: MS_PORTAL_DATA, useFactory: tabInjector }],
  schemas: [
  ]
})
export class LibMstabsModule { }
