import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MargeGraphComponent } from './marge-graph.component';

describe('MargeGraphComponent', () => {
  let component: MargeGraphComponent;
  let fixture: ComponentFixture<MargeGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MargeGraphComponent]
    });
    fixture = TestBed.createComponent(MargeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
