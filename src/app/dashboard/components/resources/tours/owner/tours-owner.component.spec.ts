import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursOwnerComponent } from './tours-owner.component';

describe('ToursOwnerComponent', () => {
  let component: ToursOwnerComponent;
  let fixture: ComponentFixture<ToursOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToursOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToursOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
