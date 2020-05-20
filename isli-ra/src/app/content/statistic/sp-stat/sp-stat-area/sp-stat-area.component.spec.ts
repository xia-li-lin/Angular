import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpStatAreaComponent } from './sp-stat-area.component';

describe('SpStatAreaComponent', () => {
  let component: SpStatAreaComponent;
  let fixture: ComponentFixture<SpStatAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpStatAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpStatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
