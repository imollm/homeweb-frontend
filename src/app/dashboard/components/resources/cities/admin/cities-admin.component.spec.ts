import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesAdminComponent } from './cities-admin.component';

describe('AdminComponent', () => {
  let component: CitiesAdminComponent;
  let fixture: ComponentFixture<CitiesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitiesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
