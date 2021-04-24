import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursCreateComponent } from './tours-create.component';

describe('ToursCreateComponent', () => {
  let component: ToursCreateComponent;
  let fixture: ComponentFixture<ToursCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
