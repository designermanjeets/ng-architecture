import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Tab } from 'lib-mstabs';
import { BehaviorSubject } from 'rxjs';
import { GraphsChartsComponent } from '../graphs-charts/graphs-charts.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, AfterViewInit {
  selectedIndex: number;
  tabsComponents: Tab[] = [];
  addMoreTabsSub: BehaviorSubject<Tab> = new BehaviorSubject(null);
  removeTabsSub: BehaviorSubject<number> = new BehaviorSubject(null);
  done: any;
  loadTree = false;

  @ViewChild('mstabs') mstabs: any;
  @ViewChild('tabsWrapper') tabsWrapper: Component;

  tabMoreMenu = [
    { matIcon: 'create', label: 'Edit Label', action: 'edit_label' },
    { matIcon: 'save', label: 'Save View', action: 'save_view' },
    { matIcon: 'add_circle', label: 'Add to Series', action: 'add_to_series' },
  ];

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.addTabs(Number(1)); // Set Any Default Value/Component' Value if No Tabs
    this.loadTree = true;
    this.cdRef.detectChanges();
  }


  addTabs(num) {
    let tab = null;
    if (num === 1) {
      tab = new Tab(GraphsChartsComponent, 'Default Tab', { data: null });
    }
    this.addMoreTabsSub.next(tab);
  }

  removeSelTabs() { // Removed from Outside
    this.removeTabsSub.next(this.selectedIndex);
  }

  tabRemoveEvent(event) { // Removed from inside
  }

  tabChangedEvent(event) {
    this.selectedIndex = event.index;
  }

  treeDragStartEvent($event: any) {
    console.log($event);
  }

  treeDragEndEvent($event: any) {
    console.log($event);
  }

  onTreeNodeDrop($event) {
    console.log($event);
    const tabExist = _.filter(this.tabsWrapper['tabsComponents'], comp =>
      comp.tabData.data && comp.tabData.data.id === $event.item.data.id)[0];
    if (!tabExist) {
      const tab = new Tab(GraphsChartsComponent, $event.item.data.item, { data: $event.item.data });
      this.addMoreTabsSub.next(tab);
    } else {
      console.error('Tab Already Exist with the Same Node!');
    }
  }

  tabMoreMenuEvent($event: any) {

    const tabExist = _.filter(this.tabsWrapper['tabsComponents'], comp =>
      comp.id === $event.tab.id)[0];
    if (tabExist) {
      console.log(tabExist);
      // tabExist.title = 'My New Title'; // Update Title here based upon condition
    } else {
      console.error('No Tab Found!');
    }
  }

}
