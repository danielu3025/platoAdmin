import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutOptionsComponent } from './layout-options.component';

describe('LayoutOptionsComponent', () => {
  let component: LayoutOptionsComponent;
  let fixture: ComponentFixture<LayoutOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
