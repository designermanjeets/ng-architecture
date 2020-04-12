import { Component, OnInit } from '@angular/core';
import { SecuredLoanComponent } from './features/products/components/secured-loan/secured-loan.component';
import { Tab } from './../../../lib-mstabs/src/lib/_models/tabs.models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'foreign-exchange';
  tabsComponents: Tab[] = [];
  addMoreTabsSub: BehaviorSubject<Tab> = new BehaviorSubject(null);
  removeTabsSub: BehaviorSubject<Tab> = new BehaviorSubject(null);

  constructor(
  ) { }

  ngOnInit(): void {
  }

  addTabs() {
    const tab = new Tab(SecuredLoanComponent, 'SecuredLoanComponent 2', { parent: 'AppComponent' });
    this.addMoreTabsSub.next(tab);
  }

  tabChangedEvent(event) {
    // console.log(event);
  }
}
