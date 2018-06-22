import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStaticObjectDetailsComponent } from './new-static-object-details.component';

describe('NewStaticObjectDetailsComponent', () => {
  let component: NewStaticObjectDetailsComponent;
  let fixture: ComponentFixture<NewStaticObjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStaticObjectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStaticObjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
