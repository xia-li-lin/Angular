import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRoleLimitsComponent } from './account-role-limits.component';

describe('AccountRoleLimitsComponent', () => {
  let component: AccountRoleLimitsComponent;
  let fixture: ComponentFixture<AccountRoleLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountRoleLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRoleLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
