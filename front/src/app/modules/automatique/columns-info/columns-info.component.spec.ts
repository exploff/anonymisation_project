import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnsInfoComponent } from './columns-info.component';

describe('ColumnsInfoComponent', () => {
  let component: ColumnsInfoComponent;
  let fixture: ComponentFixture<ColumnsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnsInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColumnsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
