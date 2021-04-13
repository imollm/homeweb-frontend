import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursEmployeeComponent } from './employee.component';

describe('EmployeeComponent', () => {
  let component: ToursEmployeeComponent;
  let fixture: ComponentFixture<ToursEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
