import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tab } from './../_models/tabs.models';

@Injectable({
  providedIn: 'root'
})

export class LibMSTabsService {
  tabs: Tab[];
  public tabSub = new BehaviorSubject<Tab[]>(this.tabs);
  public getTabID: number;

  constructor(
  ) { }

  public removeTab(id: number) {
    this.tabs.filter((element, i) => element.id === id && this.tabs.splice(i, 1));
    if (this.tabs.length > 0) {
      this.tabs[this.tabs.length - 1].active = true;
    }
    this.tabSub.next(this.tabs);
  }

  public setTabs = (tabs) => this.tabs = tabs;

  public addTab(tab: Tab) {
    this.tabs.forEach((ele, i) => {
      if (this.tabs[i].active) {
        this.tabs[i].active = false;
      }
    });
    tab.id = Date.now();
    tab.active = true;
    this.tabs.push(tab);
    this.tabSub.next(this.tabs);
    this.getTabID = tab.id;
  }

  getRow(tabs, index) {
    const row = tabs.filter((t, i) => i === index - 1);
    return row.length > 0 ? row[0] : null;
  }

}
