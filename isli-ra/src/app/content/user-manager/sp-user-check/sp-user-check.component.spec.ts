import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpUserCheckComponent } from './sp-user-check.component';

describe('SpUserCheckComponent', () => {
  let component: SpUserCheckComponent;
  let fixture: ComponentFixture<SpUserCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpUserCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpUserCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
