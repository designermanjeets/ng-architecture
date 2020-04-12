import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[libContentContainer]'
})
export class ContentContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
