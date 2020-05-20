import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecodeStatComponent } from './servicecode-stat.component';

describe('ServicecodeStatComponent', () => {
  let component: ServicecodeStatComponent;
  let fixture: ComponentFixture<ServicecodeStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecodeStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecodeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
