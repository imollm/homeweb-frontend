import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesOwnerComponent } from './properties-owner.component';

describe('OwnerComponent', () => {
  let component: PropertiesOwnerComponent;
  let fixture: ComponentFixture<PropertiesOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesOwnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
