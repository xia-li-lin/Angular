import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecodeStatSpComponent } from './servicecode-stat-sp.component';

describe('ServicecodeStatSpComponent', () => {
  let component: ServicecodeStatSpComponent;
  let fixture: ComponentFixture<ServicecodeStatSpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecodeStatSpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecodeStatSpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
