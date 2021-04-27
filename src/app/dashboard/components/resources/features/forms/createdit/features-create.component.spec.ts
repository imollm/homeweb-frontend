import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesCreateComponent } from './features-create.component';

describe('FeaturesCreateComponent', () => {
  let component: FeaturesCreateComponent;
  let fixture: ComponentFixture<FeaturesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
