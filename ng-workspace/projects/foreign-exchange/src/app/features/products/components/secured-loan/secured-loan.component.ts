import { Component, OnInit, Inject } from '@angular/core';
import { MS_PORTAL_DATA } from './../../../../shared/tabs/_services/tabs.injector';

@Component({
  selector: 'app-secured-loan',
  templateUrl: './secured-loan.component.html',
  styleUrls: ['./secured-loan.component.scss']
})

export class SecuredLoanComponent implements OnInit {

  constructor(
    @Inject(MS_PORTAL_DATA) public data: any ) {
      console.log(data);
      console.log(data._customTokens);
      console.log(data._customTokens && data._customTokens.get(MS_PORTAL_DATA));
  }

  ngOnInit(): void {
  }

  removeTab() {
    //
  }

}
