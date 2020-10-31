import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphsChartsComponent } from './graphs-charts.component';

describe('GraphsChartsComponent', () => {
  let component: GraphsChartsComponent;
  let fixture: ComponentFixture<GraphsChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphsChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
