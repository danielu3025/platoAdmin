import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTableDetailsComponent } from './new-table-details.component';

describe('NewTableDetailsComponent', () => {
  let component: NewTableDetailsComponent;
  let fixture: ComponentFixture<NewTableDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTableDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
