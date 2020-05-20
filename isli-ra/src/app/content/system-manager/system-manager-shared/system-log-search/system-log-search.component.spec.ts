import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemLogSearchComponent } from './system-log-search.component';

describe('SystemLogSearchComponent', () => {
  let component: SystemLogSearchComponent;
  let fixture: ComponentFixture<SystemLogSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemLogSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemLogSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
