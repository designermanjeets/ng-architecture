import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Tab } from 'lib-mstabs';
import { BehaviorSubject } from 'rxjs';
import {GraphsChartsComponent} from '../graphs-charts/graphs-charts.component';

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

  @ViewChild('mstabs') mstabs: Component;

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
      tab = new Tab(GraphsChartsComponent, 'Default Tab', { option: num });
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
    const tab = new Tab(GraphsChartsComponent, $event.item.data.item, { data: $event.item.data });
    this.addMoreTabsSub.next(tab);
  }
}
