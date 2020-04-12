import { Component, OnInit, Input, Output, EventEmitter, Injector, ViewContainerRef  } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { BehaviorSubject } from 'rxjs';
import { Tab } from './_models/tabs.models';
import { LibMSTabsService } from './_services/lib-mstabs.service';
import { tabInjector } from './_services/tabs.injector';

@Component({
  selector: 'app-mstabs-parent',
  templateUrl: './lib-mstabs.component.html',
  styles: [
    `
      .container-fluid {
        width: 100%;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }
      .mt-2 {
        margin-top: 2rem;
      }
    `
  ]
})

export class LibMSTabsComponent implements OnInit {
  selectedTab: number;
  public portals: any = {};
  portalHosts: any = {};
  componentRefs: any = {};
  @Input() tabsComponents;
  @Input() addMoreTabsSub: BehaviorSubject<Tab>;
  @Output() tabChangedEvent = new EventEmitter<Tab>();
  viewContainerRef: ViewContainerRef;

  constructor(
    private tabService: LibMSTabsService,
    private injector: Injector,
    private privateviewContainerRef: ViewContainerRef
  ) {
      this.viewContainerRef = this.privateviewContainerRef;
  }

  ngOnInit() {
    this.tabService.setTabs(this.tabsComponents);
    this.tabService.tabSub.subscribe(tabs => this.selectedTab = tabs && tabs.findIndex(tab => tab.active));

    this.addMoreTabsSub.subscribe(t => {
      if (t) {
        this.tabService.addTab(
          new Tab(t.component, t.title, t.tabData)
        );
      }
    });
  }

  tabChanged(event) {
    this.tabChangedEvent.emit(event);
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
