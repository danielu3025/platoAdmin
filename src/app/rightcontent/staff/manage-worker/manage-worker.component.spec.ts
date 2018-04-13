import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageWorkerComponent } from './manage-worker.component';

describe('ManageWorkerComponent', () => {
  let component: ManageWorkerComponent;
  let fixture: ComponentFixture<ManageWorkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageWorkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
