import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecodeStatAreaComponent } from './servicecode-stat-area.component';

describe('ServicecodeStatAreaComponent', () => {
  let component: ServicecodeStatAreaComponent;
  let fixture: ComponentFixture<ServicecodeStatAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecodeStatAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecodeStatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
