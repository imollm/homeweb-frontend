import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesCreateComponent } from './cities-createdit.component';

describe('CitiesCreateditComponent', () => {
  let component: CitiesCreateComponent;
  let fixture: ComponentFixture<CitiesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
