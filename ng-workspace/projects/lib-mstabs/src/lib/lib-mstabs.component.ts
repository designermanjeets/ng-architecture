import { TestComponent } from './comps/test.component';
import {  Component, OnInit, Input, Output, EventEmitter, Injector, Inject } from '@angular/core';
import { LibMSTabsService } from './_services/lib-mstabs.service';
import { Tab } from './_models/tabs.models';
import { BehaviorSubject } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { tabInjector, MS_PORTAL_DATA } from './_services/tabs.injector';

@Component({
  selector: 'lib-mstabs-parent',
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
  portals: any = {};
  portalHosts: any = {};
  componentRefs: any = {};
  @Input() tabsComponents;
  @Input() addMoreTabsSub: BehaviorSubject<Tab>;
  @Output() tabChangedEvent = new EventEmitter<Tab>();

  constructor(
    private tabService: LibMSTabsService,
    private injector: Injector,
    // @Inject(MS_PORTAL_DATA) public mytabs: BehaviorSubject<any>,
  ) {}

  ngOnInit() {
    // console.log(this.mytabs);
    this.tabService.setTabs(this.tabsComponents);
    this.tabService.addTab(
      new Tab(TestComponent, 'TestComponent 1', { compdata: 'TestComponent' })
    );
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
    this.portals[event.index] = new ComponentPortal(
      this.tabsComponents,
      null,
      tabInjector( event, this.injector )
    );
    console.log(this.portals);
  }

  removeTab(index: number): void {
    this.tabService.removeTab(index);
  }
}
