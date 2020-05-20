import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpStatSearchComponent } from './sp-stat-search.component';

describe('SpStatSearchComponent', () => {
  let component: SpStatSearchComponent;
  let fixture: ComponentFixture<SpStatSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpStatSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpStatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
