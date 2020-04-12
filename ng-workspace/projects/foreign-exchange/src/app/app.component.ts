import { Component, OnInit } from '@angular/core';
import { SecuredLoanComponent } from './features/products/components/secured-loan/secured-loan.component';
import { BehaviorSubject } from 'rxjs';
import { Tab } from 'lib-mstabs';

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

  constructor()
    { }

  ngOnInit(): void {
  }

  addTabs() {
    const tab = new Tab(SecuredLoanComponent, 'SecuredLoanComponent 2', { parent: 'AppComponent' });
    this.addMoreTabsSub.next(tab);
  }

  removeSelTabs() {
    this.removeTabsSub.next(this.selectedIndex);
  }

  tabChangedEvent(event) {
    this.selectedIndex = event.index;
  }
}
