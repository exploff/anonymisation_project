import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnonymisationComponent } from './form-anonymisation.component';

describe('FormAnonymisationComponent', () => {
  let component: FormAnonymisationComponent;
  let fixture: ComponentFixture<FormAnonymisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAnonymisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormAnonymisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
