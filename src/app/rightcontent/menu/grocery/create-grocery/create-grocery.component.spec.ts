import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGroceryComponent } from './create-grocery.component';

describe('CreateGroceryComponent', () => {
  let component: CreateGroceryComponent;
  let fixture: ComponentFixture<CreateGroceryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGroceryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroceryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
