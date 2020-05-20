import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAddListComponent } from './service-add-list.component';

describe('ServiceAddListComponent', () => {
  let component: ServiceAddListComponent;
  let fixture: ComponentFixture<ServiceAddListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceAddListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceAddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
