import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockItemFormComponent } from './create-stock-item-form.component';

describe('CreateStockItemFormComponent', () => {
  let component: CreateStockItemFormComponent;
  let fixture: ComponentFixture<CreateStockItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStockItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStockItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
