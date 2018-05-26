import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialForMealComponent } from './raw-material-for-meal.component';

describe('RawMaterialForMealComponent', () => {
  let component: RawMaterialForMealComponent;
  let fixture: ComponentFixture<RawMaterialForMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawMaterialForMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawMaterialForMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
