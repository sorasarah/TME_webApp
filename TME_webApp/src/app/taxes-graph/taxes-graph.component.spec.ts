import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesGraphComponent } from './taxes-graph.component';

describe('TaxesGraphComponent', () => {
  let component: TaxesGraphComponent;
  let fixture: ComponentFixture<TaxesGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxesGraphComponent]
    });
    fixture = TestBed.createComponent(TaxesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
