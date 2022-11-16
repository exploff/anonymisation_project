import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatiqueLayoutComponent } from './automatique-layout.component';

describe('AutomatiqueLayoutComponent', () => {
  let component: AutomatiqueLayoutComponent;
  let fixture: ComponentFixture<AutomatiqueLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomatiqueLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomatiqueLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
