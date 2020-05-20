import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterManagerTableComponent } from './register-manager-table.component';

describe('RegisterManagerTableComponent', () => {
  let component: RegisterManagerTableComponent;
  let fixture: ComponentFixture<RegisterManagerTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterManagerTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterManagerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
