import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGridObjectDetailsComponent } from './new-grid-object-details.component';

describe('NewGridObjectDetailsComponent', () => {
  let component: NewGridObjectDetailsComponent;
  let fixture: ComponentFixture<NewGridObjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGridObjectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGridObjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
