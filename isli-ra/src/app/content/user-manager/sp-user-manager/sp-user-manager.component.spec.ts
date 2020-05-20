import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpUserManagerComponent } from './sp-user-manager.component';

describe('SpUserManagerComponent', () => {
  let component: SpUserManagerComponent;
  let fixture: ComponentFixture<SpUserManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpUserManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpUserManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
