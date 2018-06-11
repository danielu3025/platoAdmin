import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRestsComponent } from './manage-rests.component';

describe('ManageRestsComponent', () => {
  let component: ManageRestsComponent;
  let fixture: ComponentFixture<ManageRestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
