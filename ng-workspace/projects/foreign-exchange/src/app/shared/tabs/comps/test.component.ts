import { Component, OnInit, Inject } from '@angular/core';
import { MS_PORTAL_DATA } from './../_services/tabs.injector';

@Component({
    selector: 'lib-test-content',
    template: '<ng-template></ng-template>'
})
export class TestComponent implements OnInit {

    constructor(
        @Inject(MS_PORTAL_DATA) public data: any
    ) {
        console.log(data);
    }

    ngOnInit() {
    }
}
