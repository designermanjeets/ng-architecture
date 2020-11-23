import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Tab } from 'lib-mstabs';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { GraphsChartsComponent } from '../graphs-charts/graphs-charts.component';

@Component({
  selector: 'app-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.scss']
})
export class LeftpanelComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() connectWithDynamicComp: any;

  selectedIndex: number;
  tabsComponents: Tab[] = [];
  addMoreTabsSub: BehaviorSubject<Tab> = new BehaviorSubject(null);
  removeTabsSub: BehaviorSubject<number> = new BehaviorSubject(null);
  done: any;
  loadTree = false;

  tabMoreMenu = [
    { matIcon: 'create', label: 'Edit Label', action: 'edit_label' },
    { matIcon: 'save', label: 'Save View', action: 'save_view' },
    { matIcon: 'add_circle', label: 'Add to Series', action: 'add_to_series' },
  ];


  @ViewChild('tabsWrapper') tabsWrapper: Component;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    _.forEach([1, 2], tab => this.addTabs());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.connectWithDynamicComp && changes.connectWithDynamicComp.currentValue) {
      console.log(changes.connectWithDynamicComp.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.loadTree = true;
    this.cdRef.detectChanges();
  }

  addTabs() {
    const tab = new Tab(GraphsChartsComponent, 'Default Left Tab', { data: { addedBy: 'Manjeet' } });
    this.addMoreTabsSub.next(tab);
    this.cdRef.detectChanges();
  }

  tabRemoveEvent(event) { // Removed from inside
  }

  tabChangedEvent(event) {
    this.selectedIndex = event.index;
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
