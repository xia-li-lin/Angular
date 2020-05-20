import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFormCnComponent } from './service-form-cn.component';

describe('ServiceFormCnComponent', () => {
  let component: ServiceFormCnComponent;
  let fixture: ComponentFixture<ServiceFormCnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceFormCnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceFormCnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
