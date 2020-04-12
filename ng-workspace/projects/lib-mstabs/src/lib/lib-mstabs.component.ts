import { Component, OnInit, Input, Output, EventEmitter, Injector, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { LibMSTabsService } from './_services/lib-mstabs.service';
import { Tab } from './_models/tabs.models';
import { tabInjector } from './_services/tabs.injector';

@Component({
  selector: 'lib-mstabs-wrapper',
  templateUrl: './lib-mstabs.component.html',
})

export class LibMSTabsComponent implements OnInit {
  selectedTab: number;
  portals: any = {};
  portalHosts: any = {};
  componentRefs: any = {};
  @Input() tabsComponents;
  @Input() addMoreTabsSub: BehaviorSubject<Tab>;
  @Input() removeTabsSub: BehaviorSubject<number>;
  @Output() tabChangedEvent = new EventEmitter<Tab>();
  viewContainerRef: ViewContainerRef;

  constructor(
    private tabService: LibMSTabsService,
    private injector: Injector,
    private privateviewContainerRef: ViewContainerRef,
  ) {
      this.viewContainerRef = this.privateviewContainerRef;
    }

  ngOnInit() {
    this.tabService.setTabs(this.tabsComponents);

    this.addMoreTabsSub.subscribe((t: Tab) => t && this.addTab(t));

    this.removeTabsSub.subscribe((t: number) => t !== null && this.removeTab(Number(t)));

    this.tabService.tabSub.subscribe(tabs => this.selectedTab = tabs && tabs.findIndex(tab => tab.active));

  }

  addTab(t) {
    this.tabService.addTab(
      new Tab(t.component, t.title, t.tabData)
    );
  }

  tabChanged(event) {
    this.tabChangedEvent.emit(event);
    this.injectToken(event);
  }

  injectToken(event?) {
    this.portals = new ComponentPortal(
      this.tabsComponents,
      this.viewContainerRef,
      tabInjector( { event, ...this.portals }, this.injector )
    );
    tabInjector( { event, ...this.portals }, this.injector );
    console.log(this.portals);
  }

  removeTab(index: number): void {
    this.tabService.removeTab(index);
  }

}
