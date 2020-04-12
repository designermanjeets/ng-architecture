import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './core/routing/app-routing.module';
import { MsMaterialModule } from './shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';

// Libs || Ignore the Linting Errors || Verify path in tsconfig.json
import { LibMsloginModule } from 'lib-mslogin';
// import { LibMstabsModule } from 'lib-mstabs';
import { LibMstabsModule } from './shared/tabs/lib-mstabs.module';
import { LibMSTabsComponent } from './../../../lib-mstabs/src/lib/lib-mstabs.component';
import { MS_PORTAL_DATA, tabInjector } from './shared/tabs/_services/tabs.injector';

@NgModule({
  declarations: [
    AppComponent,
    LibMSTabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LibMsloginModule,
    MsMaterialModule,
    ReactiveFormsModule,
    LibMstabsModule
  ],
  providers: [{ provide: MS_PORTAL_DATA, useFactory: tabInjector }],
  bootstrap: [AppComponent]
})
export class AppModule { }
