import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from 'lib-mstabs';
import { ChangeDetectorRef } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import { Router } from '@angular/router';

// Store
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './../../core/store/store';
import { GET_ALL_TABS } from './../../core/store/actions';

import { UnsecuredLoanComponent } from './../products/components/unsecured-loan/unsecured-loan.component';
import { SecuredLoanComponent } from './../products/components/secured-loan/secured-loan.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit {
    selectedIndex: number;
    tabsComponents: Tab[] = [];
    addMoreTabsSub: BehaviorSubject<Tab> = new BehaviorSubject(null);
    removeTabsSub: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor(
    private cdref: ChangeDetectorRef,
    private ngRedux: NgRedux<IAppState>,
    private ngxService: NgxUiLoaderService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        this.router.navigate(['/login'] );
    }
  }

  ngAfterViewInit(): void {
    const cachedState = sessionStorage.getItem('state');
    if (cachedState && JSON.parse(cachedState).tabs){
      const ts = JSON.parse(cachedState).tabs;
      let ind = 0;
      ts.payloadTabs.forEach(e => {
        this.addTabs(e.tabData.option);
        this.cdref.detectChanges();
        ind++;
        ts.payloadTabs.length === ind ? this.ngxService.stop() : this.ngxService.start();
      });
    } else {
      this.addTabs(Number(1)); // Set Any Default Value/Component' Value if No Tabs
    }
  }

  selectionChange($event) {
    this.addTabs(Number($event.value));
  }

  addTabs(num) {
    let tab = null;
    if (num === 1) {
      tab = new Tab(SecuredLoanComponent, 'Secured Loan', { option: num });
    } else
    if (num === 2) {
      tab = new Tab(UnsecuredLoanComponent, 'Unsecured Loan', { option: num });
    }
    this.addMoreTabsSub.next(tab);
    this.updateState();
  }

  removeSelTabs() { // Reomove from Outside
    this.removeTabsSub.next(this.selectedIndex);
    this.updateState();
  }

  tabRemoveEvent(event) { // Reomove from inside
    this.updateState();
  }

  tabChangedEvent(event) {
    this.selectedIndex = event.index;
  }

  updateState() {
    this.cdref.detectChanges();
    this.ngRedux.dispatch({ type: GET_ALL_TABS, payloadTabs: [...this.tabsComponents] });
    sessionStorage.setItem('state', JSON.stringify(this.ngRedux.getState()));
  }
}
