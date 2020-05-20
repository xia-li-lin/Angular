import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFormEnComponent } from './service-form-en.component';

describe('ServiceFormEnComponent', () => {
  let component: ServiceFormEnComponent;
  let fixture: ComponentFixture<ServiceFormEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceFormEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceFormEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
