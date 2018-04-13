import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestsOptionsComponent } from './rests-options.component';

describe('RestsOptionsComponent', () => {
  let component: RestsOptionsComponent;
  let fixture: ComponentFixture<RestsOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
