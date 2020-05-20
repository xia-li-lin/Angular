import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpStatTableComponent } from './sp-stat-table.component';

describe('SpStatTableComponent', () => {
  let component: SpStatTableComponent;
  let fixture: ComponentFixture<SpStatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpStatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpStatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
