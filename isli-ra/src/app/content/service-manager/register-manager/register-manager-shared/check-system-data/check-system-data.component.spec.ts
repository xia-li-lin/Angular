import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckSystemDataComponent } from './check-system-data.component';

describe('CheckSystemDataComponent', () => {
  let component: CheckSystemDataComponent;
  let fixture: ComponentFixture<CheckSystemDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckSystemDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckSystemDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
