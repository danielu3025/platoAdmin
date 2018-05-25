import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMealPageComponent } from './create-meal-page.component';

describe('CreateMealPageComponent', () => {
  let component: CreateMealPageComponent;
  let fixture: ComponentFixture<CreateMealPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMealPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMealPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
