import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProductDetailComponent } from './service-product-detail.component';

describe('ServiceProductDetailComponent', () => {
  let component: ServiceProductDetailComponent;
  let fixture: ComponentFixture<ServiceProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
