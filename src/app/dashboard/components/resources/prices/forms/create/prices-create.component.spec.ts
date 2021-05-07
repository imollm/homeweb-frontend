import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesCreateComponent } from './prices-create.component';

describe('PricesCreateComponent', () => {
  let component: PricesCreateComponent;
  let fixture: ComponentFixture<PricesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
