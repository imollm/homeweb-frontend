import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesCreateComponent } from './properties-create.component';

describe('CreateComponent', () => {
  let component: PropertiesCreateComponent;
  let fixture: ComponentFixture<PropertiesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertiesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
