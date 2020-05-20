import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LcStatComponent } from './lc-stat.component';

describe('LcStatComponent', () => {
  let component: LcStatComponent;
  let fixture: ComponentFixture<LcStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LcStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LcStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
