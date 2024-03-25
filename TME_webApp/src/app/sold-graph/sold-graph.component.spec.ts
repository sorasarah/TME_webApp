import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldGraphComponent } from './sold-graph.component';

describe('SoldGraphComponent', () => {
  let component: SoldGraphComponent;
  let fixture: ComponentFixture<SoldGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoldGraphComponent]
    });
    fixture = TestBed.createComponent(SoldGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
