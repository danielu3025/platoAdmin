import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalMenuFormComponent } from './final-menu-form.component';

describe('FinalMenuFormComponent', () => {
  let component: FinalMenuFormComponent;
  let fixture: ComponentFixture<FinalMenuFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalMenuFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalMenuFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
