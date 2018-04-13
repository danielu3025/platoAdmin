import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRestComponent } from './manage-rest.component';

describe('ManageRestComponent', () => {
  let component: ManageRestComponent;
  let fixture: ComponentFixture<ManageRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
