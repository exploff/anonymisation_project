import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormManuelComponent } from './form-manuel.component';

describe('FormManuelComponent', () => {
  let component: FormManuelComponent;
  let fixture: ComponentFixture<FormManuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormManuelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormManuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
