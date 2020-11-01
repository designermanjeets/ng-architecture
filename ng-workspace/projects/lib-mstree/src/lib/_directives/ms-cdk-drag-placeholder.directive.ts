import { Directive, Host, Self, OnInit, OnDestroy, TemplateRef, ViewContainerRef,
  Renderer2 } from '@angular/core';
import { CdkDrag, CdkDragStart, CdkDragExit, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[msCdkDragPlaceholder]'
})
export class MSCdkDragPlaceholderDirective implements OnInit, OnDestroy {

  private originalIndex: number;

  private subs: Subscription[] = [];

  constructor(
    @Self() private cdkDrag: CdkDrag,
    // private templateRef: TemplateRef<any>,
    // private viewContainerRef: ViewContainerRef,
    private renderer2: Renderer2
  ) {

  }

  ngOnInit() {
    console.log('msCdkDragPlaceholder');
    this.subs.push(
      this.cdkDrag.started.subscribe((event: CdkDragStart) => {
        const draggingElement = event.source.getRootElement();
        const containerElement = draggingElement.parentElement;
        this.originalIndex = Array.from(containerElement.children).indexOf(draggingElement);
      }),

      this.cdkDrag.entered.subscribe((event: CdkDragExit) => {
        const { container, item } = event;
        const draggingElement = item.element.nativeElement;
        const containerElement = item.dropContainer.element.nativeElement;
        if (container === item.dropContainer) {
          this.removeClonedNode(container.element.nativeElement);
          return;
        }

        const clonedNode = draggingElement.cloneNode(true) as HTMLDivElement;
        this.renderer2.setAttribute(clonedNode, 'id', '');
        this.renderer2.removeClass(clonedNode, 'cdk-drag-dragging');
        this.renderer2.addClass(clonedNode, 'cdk-drag-placeholder-cloned');
        this.renderer2.setStyle(clonedNode, 'display', 'flex');

        this.renderer2.insertBefore(
          containerElement,
          clonedNode,
          containerElement.children.item(this.originalIndex)
        );
      }),

      this.cdkDrag.ended.subscribe((event: CdkDragEnd) => {
        const container = event.source.dropContainer.element.nativeElement;
        this.removeClonedNode(container);
      })
    );
  }

  ngOnDestroy() {
    this.subs.forEach(x => x.unsubscribe());
  }

  removeClonedNode(container: HTMLElement) {
    const clonedNode = Array.from(container.children)
      .find(x => x.classList.contains('cdk-drag-placeholder-cloned'));
    if (clonedNode) {
      container.removeChild(clonedNode);
    }
  }

}
