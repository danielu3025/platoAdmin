import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployFormComponent } from './employ-form.component';

describe('EmployFormComponent', () => {
  let component: EmployFormComponent;
  let fixture: ComponentFixture<EmployFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
