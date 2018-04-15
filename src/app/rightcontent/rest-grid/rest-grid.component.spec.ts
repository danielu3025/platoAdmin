import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestGridComponent } from './rest-grid.component';

describe('RestGridComponent', () => {
  let component: RestGridComponent;
  let fixture: ComponentFixture<RestGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
