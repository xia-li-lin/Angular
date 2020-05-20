import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcStatSearchComponent } from './lc-stat-search.component';

describe('LcStatSearchComponent', () => {
  let component: LcStatSearchComponent;
  let fixture: ComponentFixture<LcStatSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcStatSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcStatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
