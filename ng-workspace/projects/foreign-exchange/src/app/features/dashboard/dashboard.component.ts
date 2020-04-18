import { map } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Tab } from 'lib-mstabs';
import { ChangeDetectorRef } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService

// Store
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from './../../core/store/store';
import { GET_ALL_TABS } from './../../core/store/actions';

import { Post, AllPostsGQL, GetRatesGQL, ExchangeRate } from './../../graph-queries/graphql';

import { UnsecuredLoanComponent } from './../products/components/unsecured-loan/unsecured-loan.component';
import { SecuredLoanComponent } from './../products/components/secured-loan/secured-loan.component';
import { AuthenticationService } from 'lib-mslogin';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
    selectedIndex: number;
    tabsComponents: Tab[] = [];
    addMoreTabsSub: BehaviorSubject<Tab> = new BehaviorSubject(null);
    removeTabsSub: BehaviorSubject<number> = new BehaviorSubject(null);
    currentUser: any;
    private querySubscription: Subscription;
    posts: Observable<Post[]>; rates: ExchangeRate[]; // GraphQL Queries || Types

  constructor(
    private cdref: ChangeDetectorRef,
    private ngRedux: NgRedux<IAppState>,
    private ngxService: NgxUiLoaderService,
    private authenticationService: AuthenticationService,
    private allPostsGQL: AllPostsGQL,
    private getRatesGQL: GetRatesGQL
  ) {
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => !user && sessionStorage.removeItem('state'));
    this.getRates();
    this.getPosts();
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

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  getRates(){
    this.querySubscription = this.getRatesGQL.watch()
      .valueChanges
      .subscribe(({ data, loading }) => console.log(data));
  }

  getPosts() {
    this.posts = this.allPostsGQL.watch()
      .valueChanges
      .pipe(map(result => result.data.posts));

    this.posts.subscribe(val => console.log(val));
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
