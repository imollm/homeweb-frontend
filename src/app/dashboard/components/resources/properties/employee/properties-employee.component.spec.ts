import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesEmployeeComponent } from './employee.component';

describe('PropertiesEmployeeComponent', () => {
  let component: PropertiesEmployeeComponent;
  let fixture: ComponentFixture<PropertiesEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
