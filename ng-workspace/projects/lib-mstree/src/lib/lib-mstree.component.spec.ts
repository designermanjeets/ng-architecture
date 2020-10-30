import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibMstreeComponent } from './lib-mstree.component';

describe('LibMstreeComponent', () => {
  let component: LibMstreeComponent;
  let fixture: ComponentFixture<LibMstreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibMstreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibMstreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
