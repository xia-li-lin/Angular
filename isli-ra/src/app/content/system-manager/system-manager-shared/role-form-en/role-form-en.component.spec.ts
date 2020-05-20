import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleFormEnComponent } from './role-form-en.component';

describe('RoleFormEnComponent', () => {
  let component: RoleFormEnComponent;
  let fixture: ComponentFixture<RoleFormEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleFormEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleFormEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
