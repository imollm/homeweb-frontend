import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAdminComponent } from './sales-admin.component';

describe('AdminComponent', () => {
  let component: SalesAdminComponent;
  let fixture: ComponentFixture<SalesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
