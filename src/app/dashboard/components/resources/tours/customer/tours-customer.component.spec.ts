import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursCustomerComponent } from './customer.component';

describe('CustomerComponent', () => {
  let component: ToursCustomerComponent;
  let fixture: ComponentFixture<ToursCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
