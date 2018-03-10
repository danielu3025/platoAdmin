import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffOptionsComponent } from './staff-options.component';

describe('StaffOptionsComponent', () => {
  let component: StaffOptionsComponent;
  let fixture: ComponentFixture<StaffOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
