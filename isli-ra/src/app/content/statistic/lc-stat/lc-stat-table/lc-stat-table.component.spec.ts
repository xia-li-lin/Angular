import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcStatTableComponent } from './lc-stat-table.component';

describe('LcStatTableComponent', () => {
  let component: LcStatTableComponent;
  let fixture: ComponentFixture<LcStatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcStatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcStatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
