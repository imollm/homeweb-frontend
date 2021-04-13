import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesCustomerComponent } from './properties-customer.component';

describe('CustomerComponent', () => {
  let component: PropertiesCustomerComponent;
  let fixture: ComponentFixture<PropertiesCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
