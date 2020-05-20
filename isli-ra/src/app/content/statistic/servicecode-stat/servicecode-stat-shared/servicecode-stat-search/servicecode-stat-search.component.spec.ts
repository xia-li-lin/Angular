import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecodeStatSearchComponent } from './servicecode-stat-search.component';

describe('ServicecodeStatSearchComponent', () => {
  let component: ServicecodeStatSearchComponent;
  let fixture: ComponentFixture<ServicecodeStatSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecodeStatSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecodeStatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
