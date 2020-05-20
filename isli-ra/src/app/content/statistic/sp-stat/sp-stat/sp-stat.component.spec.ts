import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpStatComponent } from './sp-stat.component';

describe('SpStatComponent', () => {
  let component: SpStatComponent;
  let fixture: ComponentFixture<SpStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
