import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleLimitsComponent } from './role-limits.component';

describe('RoleLimitsComponent', () => {
  let component: RoleLimitsComponent;
  let fixture: ComponentFixture<RoleLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
