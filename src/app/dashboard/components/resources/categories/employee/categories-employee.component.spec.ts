import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesEmployeeComponent } from './employee.component';

describe('EmployeeComponent', () => {
  let component: CategoriesEmployeeComponent;
  let fixture: ComponentFixture<CategoriesEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
