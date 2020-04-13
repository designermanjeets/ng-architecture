import { Component, OnInit, Inject } from '@angular/core';
import { MS_PORTAL_DATA } from 'lib-mstabs';

@Component({
  selector: 'app-secured-loan',
  templateUrl: './secured-loan.component.html',
  styleUrls: ['./secured-loan.component.scss']
})

export class SecuredLoanComponent implements OnInit {

  constructor(
    @Inject(MS_PORTAL_DATA) public data: any ) {
      console.log(data);
  }

  ngOnInit(): void {
  }

  removeTab() {
    //
  }

}
