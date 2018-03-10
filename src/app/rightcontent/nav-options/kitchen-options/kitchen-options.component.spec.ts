import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenOptionsComponent } from './kitchen-options.component';

describe('KitchenOptionsComponent', () => {
  let component: KitchenOptionsComponent;
  let fixture: ComponentFixture<KitchenOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
