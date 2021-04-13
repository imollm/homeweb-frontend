import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesEmployeeComponent } from './sales-employee.component';

describe('EmployeeComponent', () => {
  let component: SalesEmployeeComponent;
  let fixture: ComponentFixture<SalesEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
