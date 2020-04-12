import { Injectable } from '@angular/core';
import { Tab } from './../_models/tabs.models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LibMSTabsService {
  tabs: Tab[];

  public tabSub = new BehaviorSubject<Tab[]>(this.tabs);

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
