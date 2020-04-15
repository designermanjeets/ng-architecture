
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Tab } from 'lib-mstabs';
import { SecuredLoanComponent } from './features/products/components/secured-loan/secured-loan.component';
import { UnsecuredLoanComponent } from './features/products/components/unsecured-loan/unsecured-loan.component';
import { ChangeDetectorRef } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

// Store
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './core/store/store';
import { GET_ALL_TABS } from './core/store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'foreign-exchange';
  selectedIndex: number;
  tabsComponents: Tab[] = [];
  addMoreTabsSub: BehaviorSubject<Tab> = new BehaviorSubject(null);
  removeTabsSub: BehaviorSubject<number> = new BehaviorSubject(null);
  tComps: any = {SecuredLoanComponent, UnsecuredLoanComponent};

  constructor(
    private cdref: ChangeDetectorRef,
    private ngRedux: NgRedux<IAppState>,
    private ngxService: NgxUiLoaderService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (sessionStorage.getItem('state') && sessionStorage.getItem('state')){
      const ts = JSON.parse(sessionStorage.getItem('state'));
      let ind = 0;
      ts.tabs.payloadTabs.forEach(e => {
        this.addTabs(e.tabData.option);
        this.cdref.detectChanges();
        ind++;
        ts.tabs.payloadTabs.length === ind ? this.ngxService.stop() : this.ngxService.start();
      });
    }  }

  addTabs(num) {
    let tab = null;
    if (num === 1) {
      tab = new Tab(SecuredLoanComponent, 'SecuredLoanComponent 1', { option: num });
    } else
    if (num === 2) {
      tab = new Tab(UnsecuredLoanComponent, 'UnsecuredLoanComponent 2', { option: num });
    }
    this.addMoreTabsSub.next(tab);
    this.ngRedux.dispatch({ type: GET_ALL_TABS, payloadTabs: [...this.tabsComponents] });
    sessionStorage.setItem('state', JSON.stringify(this.ngRedux.getState()));
  }

  removeSelTabs() {
    this.removeTabsSub.next(this.selectedIndex);
  }

  tabChangedEvent(event) {
    this.selectedIndex = event.index;
  }
}
