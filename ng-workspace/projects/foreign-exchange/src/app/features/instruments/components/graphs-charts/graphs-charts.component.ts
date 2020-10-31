import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MS_PORTAL_DATA } from 'lib-mstabs';

@Component({
  selector: 'app-graphs-charts',
  templateUrl: './graphs-charts.component.html',
  styleUrls: ['./graphs-charts.component.scss']
})
export class GraphsChartsComponent implements OnInit {

  constructor(
    @Optional() @Inject(MS_PORTAL_DATA) public data: any ) {
    console.log(data);
  }

  ngOnInit(): void {
  }

}
