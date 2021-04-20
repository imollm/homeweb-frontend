import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesEmployeeComponent } from './countries-employee.component';

describe('CountriesEmployeeComponent', () => {
  let component: CountriesEmployeeComponent;
  let fixture: ComponentFixture<CountriesEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
