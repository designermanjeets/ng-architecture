import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './core/routing/app-routing.module';
import { MsMaterialModule } from './shared/material.module';

// Components
import { AppComponent } from './app.component';

// Libs || Ignore the Linting Errors || Verify path in tsconfig.json
import { LibMsloginModule } from 'lib-mslogin';
import { LibMstabsModule, MS_PORTAL_DATA, tabInjector } from 'lib-mstabs';

@NgModule({
  declarations: [
    AppComponent,
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
