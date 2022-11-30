import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesNavbarComponent } from './tables-navbar.component';

describe('TablesNavbarComponent', () => {
  let component: TablesNavbarComponent;
  let fixture: ComponentFixture<TablesNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablesNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
