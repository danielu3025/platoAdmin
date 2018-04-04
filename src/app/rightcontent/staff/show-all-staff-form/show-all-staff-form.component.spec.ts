import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {staffListFormComponent, ShowAllStaffFormComponent} from './show-all-staff-form.component';

describe('staffListFormComponent', () => {
    let component: ShowAllStaffFormComponent;
    let fixture: ComponentFixture<ShowAllStaffFormComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShowAllStaffFormComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShowAllStaffFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});