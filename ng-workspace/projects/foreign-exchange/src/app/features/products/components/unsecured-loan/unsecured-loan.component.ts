import { Component, OnInit, Inject } from '@angular/core';
import { MS_PORTAL_DATA } from 'lib-mstabs';

@Component({
  selector: 'app-unsecured-loan',
  templateUrl: './unsecured-loan.component.html',
  styleUrls: ['./unsecured-loan.component.scss']
})

export class UnsecuredLoanComponent implements OnInit {

  constructor(
    @Inject(MS_PORTAL_DATA) public data: any ) {
      console.log(data._customTokens && data._customTokens.get(MS_PORTAL_DATA));
  }

  ngOnInit(): void {
  }

}
