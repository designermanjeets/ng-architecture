import { Component, OnInit, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from 'lib-mstabs';
import { MS_PORTAL_DATA } from 'lib-mstabs';
import { SecuredLoanComponent } from './features/products/components/secured-loan/secured-loan.component';
import { UnsecuredLoanComponent } from './features/products/components/unsecured-loan/unsecured-loan.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'foreign-exchange';
  selectedIndex: number;
  tabsComponents: Tab[] = [];
  addMoreTabsSub: BehaviorSubject<Tab> = new BehaviorSubject(null);
  removeTabsSub: BehaviorSubject<number> = new BehaviorSubject(null);

  constructor(
    @Inject(MS_PORTAL_DATA) public data: any ) {
      console.log(data);
  }

  ngOnInit(): void {
  }

  addTabs(num) {
    let tab = null;
    if (num === 1) {
       tab = new Tab(SecuredLoanComponent, 'SecuredLoanComponent 1', { parent: 'AppComponent' });
    } else
    if (num === 2) {
       tab = new Tab(UnsecuredLoanComponent, 'UnsecuredLoanComponent 2', { parent: 'AppComponent' });
    }
    this.addMoreTabsSub.next(tab);
  }

  removeSelTabs() {
    this.removeTabsSub.next(this.selectedIndex);
  }

  tabChangedEvent(event) {
    this.selectedIndex = event.index;
  }
}
