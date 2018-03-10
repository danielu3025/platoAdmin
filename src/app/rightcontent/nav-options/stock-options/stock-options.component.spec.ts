import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOptionsComponent } from './stock-options.component';

describe('StockOptionsComponent', () => {
  let component: StockOptionsComponent;
  let fixture: ComponentFixture<StockOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
