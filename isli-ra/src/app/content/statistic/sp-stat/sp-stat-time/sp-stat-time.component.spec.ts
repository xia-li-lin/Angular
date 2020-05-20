import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpStatTimeComponent } from './sp-stat-time.component';

describe('SpStatTimeComponent', () => {
  let component: SpStatTimeComponent;
  let fixture: ComponentFixture<SpStatTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpStatTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpStatTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
