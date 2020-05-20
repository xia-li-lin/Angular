import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicePushComponent } from './service-push.component';

describe('ServicePushComponent', () => {
  let component: ServicePushComponent;
  let fixture: ComponentFixture<ServicePushComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicePushComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicePushComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
