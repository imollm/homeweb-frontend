import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesCreateComponent } from './createdit.component';

describe('CreateditComponent', () => {
  let component: CountriesCreateComponent;
  let fixture: ComponentFixture<CountriesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
