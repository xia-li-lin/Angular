import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleFormTwComponent } from './role-form-tw.component';

describe('RoleFormTwComponent', () => {
  let component: RoleFormTwComponent;
  let fixture: ComponentFixture<RoleFormTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleFormTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleFormTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
