import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAdminComponent } from './admin.component';

describe('AdminComponent', () => {
  let component: CategoriesAdminComponent;
  let fixture: ComponentFixture<CategoriesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
