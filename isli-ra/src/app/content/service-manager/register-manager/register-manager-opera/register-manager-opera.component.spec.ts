import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterManagerOperaComponent } from './register-manager-opera.component';

describe('RegisterManagerOperaComponent', () => {
  let component: RegisterManagerOperaComponent;
  let fixture: ComponentFixture<RegisterManagerOperaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterManagerOperaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterManagerOperaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
