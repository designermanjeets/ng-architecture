import { TabContentComponent } from './tab-content.component';
import {  Component, OnInit, Input, Output, EventEmitter, Injector,
          ViewContainerRef, ContentChildren, QueryList, Inject,
          ComponentFactoryResolver, ApplicationRef
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { LibMSTabsService } from './_services/lib-mstabs.service';
import { Tab } from './_models/tabs.models';
import { tabInjector } from './_services/tabs.injector';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'lib-mstabs-wrapper',
  templateUrl: './lib-mstabs.component.html',
})

export class LibMSTabsComponent implements OnInit {
  selectedTab: number;
  portals: any = {};
  portalHosts: any = {};
  componentRefs: any = {};
  tabID: any;
  @Input() tabsComponents;
  @Input() addMoreTabsSub: BehaviorSubject<Tab>;
  @Input() removeTabsSub: BehaviorSubject<number>;
  @Output() tabChangedEvent = new EventEmitter<any>();
  viewContainerRef: ViewContainerRef;

  @ContentChildren(TabContentComponent) TabContentComponent: QueryList<Tab>;

  constructor(
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private tabService: LibMSTabsService,
    private injector: Injector,
    private privateviewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document
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
    this.tabID = this.tabService.getTabID;
  }

  tabChanged(event) {
    const tID = this.tabsComponents[event.index].id;
    const row = this.tabsComponents[event.index];
    this.tabChangedEvent.emit(event);
    this.injectToken(tID, row);
  }

  injectToken(tID, row) {
    if (!this.portalHosts[tID]) {
      this.portalHosts[tID] = new DomPortalHost(
        this.document.querySelector(`#mstab-${tID}`),
        this.cfr,
        this.appRef,
        this.injector
      );
      // Below Code will inject Tab Component anywhere without component's factory and directive Method
      if (row && this.portalHosts[tID].outletElement) { //  && !this.portals[tID]
        this.portals[tID] = new ComponentPortal(
          row.component,
          this.viewContainerRef,
          tabInjector( row , this.injector )
        );
        this.componentRefs[tID] = this.portalHosts[tID].attach(this.portals[tID]);
      }
    }
  }

  getComPortal(tID): ComponentPortal<any> {
    return this.portals[tID];
  }

  removeTab(index: number): void {
    const tID = this.tabsComponents[index].id;
    delete this.portals[tID];
    this.tabService.removeTab(tID);
  }

}
