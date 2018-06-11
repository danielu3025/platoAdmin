import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRestComponent } from './create-rest.component';

describe('CreateRestComponent', () => {
  let component: CreateRestComponent;
  let fixture: ComponentFixture<CreateRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
