import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesAdminComponent } from './countries-admin.component';

describe('AdminComponent', () => {
  let component: CountriesAdminComponent;
  let fixture: ComponentFixture<CountriesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountriesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountriesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
