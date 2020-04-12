import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibMsloginComponent } from './lib-mslogin.component';

describe('LibMsloginComponent', () => {
  let component: LibMsloginComponent;
  let fixture: ComponentFixture<LibMsloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibMsloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibMsloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
