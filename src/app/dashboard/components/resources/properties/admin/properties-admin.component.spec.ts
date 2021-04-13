import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesAdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: PropertiesAdminComponent;
  let fixture: ComponentFixture<PropertiesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
