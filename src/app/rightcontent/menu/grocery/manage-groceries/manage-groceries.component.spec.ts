import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageGroceriesComponent } from './manage-groceries.component';

describe('ManageGroceriesComponent', () => {
  let component: ManageGroceriesComponent;
  let fixture: ComponentFixture<ManageGroceriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageGroceriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageGroceriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
