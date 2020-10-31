import { TabContentComponent } from './tab-content.component';
import {  Component, OnInit, Input, Output, EventEmitter, Injector,
          ViewContainerRef, ContentChildren, QueryList, Inject,
          ComponentFactoryResolver, ApplicationRef, ChangeDetectorRef, OnDestroy
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { LibMSTabsService } from './_services/lib-mstabs.service';
import { Tab } from './_models/tabs.models';
import { tabInjector } from './_services/tabs.injector';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'lib-mstabs-wrapper',
  templateUrl: './lib-mstabs.component.html',
  styles: [
    ` :host { display: block; height: 100%; }
    `
  ]
})

export class LibMSTabsComponent implements OnInit, OnDestroy {
  selectedTab: number;
  portals: any = {};
  portalHosts: any = {};
  componentRefs: any = {};
  subs: Subscription;
  @Input() tabsComponents;
  @Input() addMoreTabsSub: BehaviorSubject<Tab>;
  @Input() removeTabsSub: BehaviorSubject<number>;
  @Output() tabRemoveEvent = new EventEmitter<any>();
  @Output() tabChangedEvent = new EventEmitter<any>();
  viewContainerRef: ViewContainerRef;

  @ContentChildren(TabContentComponent) TabContentComponent: QueryList<Tab>;

  constructor(
    private cfr: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private tabService: LibMSTabsService,
    private injector: Injector,
    private privateviewContainerRef: ViewContainerRef,
    private cdref: ChangeDetectorRef,
    @Inject(DOCUMENT) private document: Document,
  ) {
      this.viewContainerRef = this.privateviewContainerRef;
    }

  ngOnInit() {
    this.tabService.setTabs(this.tabsComponents);

    this.subs = this.addMoreTabsSub.subscribe((t: Tab) => t && this.addTab(t));

    this.subs = this.removeTabsSub.subscribe((t: number) => t !== null && this.removeTab(Number(t)));

    this.subs = this.tabService.tabSub.subscribe(tabs => {
      if (tabs) {
        this.selectedTab = tabs.findIndex(tab => tab.active);
        const row = tabs[this.selectedTab];
        this.cdref.detectChanges();
        this.injectToken(row.id, row);
      }
    });

  }

  addTab(t) {
    this.tabService.addTab(
      new Tab(t.component, t.title, t.tabData)
    );
  }

  tabChanged(event) {
    this.tabChangedEvent.emit(event);
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
    if (this.tabsComponents.length > 1) {
        const tID = this.tabsComponents[index].id;
        delete this.portals[tID];
        this.tabService.removeTab(tID);
        this.tabRemoveEvent.emit(this.tabsComponents);
    } else {
        console.error('Atleast One Tab Should Be There!');
    }
  }

  ngOnDestroy(): void {
    if (this.subs) { this.subs.unsubscribe(); }
  }
}
