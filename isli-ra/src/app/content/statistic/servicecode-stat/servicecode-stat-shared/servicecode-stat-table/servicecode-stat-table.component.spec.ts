import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecodeStatTableComponent } from './servicecode-stat-table.component';

describe('ServicecodeStatTableComponent', () => {
  let component: ServicecodeStatTableComponent;
  let fixture: ComponentFixture<ServicecodeStatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecodeStatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecodeStatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
