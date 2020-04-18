import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './core/routing/app-routing.module';
import { MsMaterialModule } from './shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { LoginShellComponent } from './shared/login/loginshell.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

// Libs || Ignore the Linting Errors || Verify path in tsconfig.json
import { LibMsloginModule } from 'lib-mslogin';
import { LibMstabsModule } from 'lib-mstabs';

import { IAppState, rootReducer, INITIAL_STATE } from './core/store/store';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgxUiLoaderModule, NgxUiLoaderConfig } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: '#5957d6',
  bgsOpacity: 1,
  bgsPosition: 'bottom-right',
  bgsSize: 150,
  bgsType: 'ball-spin-clockwise-fade-rotating',
  blur: 8,
  delay: 0,
  fastFadeOut: true,
  fgsColor: '#5957d6',
  fgsPosition: 'center-center',
  fgsSize: 100,
  fgsType: 'three-bounce',
  gap: 10,
  logoPosition: 'center-center',
  logoSize: 120,
  logoUrl: '',
  masterLoaderId: 'master',
  overlayBorderRadius: '0',
  overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: '#5957d6',
  pbDirection: 'ltr',
  pbThickness: 7,
  hasProgressBar: true,
  text: '',
  textColor: '#FFFFFF',
  textPosition: 'center-center',
  maxTime: -1,
  minTime: 300
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LibMsloginModule,
    MsMaterialModule,
    ReactiveFormsModule,
    LibMstabsModule,
    NgReduxModule,
    FlexLayoutModule,
    GraphQLModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(ngRedux: NgRedux<IAppState>){
    ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
