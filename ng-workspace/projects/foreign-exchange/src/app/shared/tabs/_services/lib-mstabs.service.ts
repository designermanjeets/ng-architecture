import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from './../_models/tabs.models';

@Injectable({
  providedIn: 'root'
})

export class LibMSTabsService {
  tabs: any;
  public portals: any = {};
  public tabSub = new BehaviorSubject<Tab[]>(this.tabs);

  constructor(
  ) {}

  public removeTab(index: number) {
    this.tabs[this.tabs.length - 1].active = this.tabs.length > 0;
    this.tabs.splice(index, 1);
    this.tabSub.next(this.tabs);
  }

  public setTabs = (tabs) => this.tabs = tabs;

  public addTab(tab: Tab) {
    this.tabs.forEach((ele, i) => {
      if (this.tabs[i].active) {
        this.tabs[i].active = false;
      }
    });
    tab.id = this.tabs.length + 1;
    tab.active = true;
    this.tabs.push(tab);
    this.tabSub.next(this.tabs);
  }

}
