import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageKitchenComponent } from './manage-kitchen.component';

describe('ManageKitchenComponent', () => {
  let component: ManageKitchenComponent;
  let fixture: ComponentFixture<ManageKitchenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageKitchenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageKitchenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
