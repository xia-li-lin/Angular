import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdDetailComponent } from './threshold-detail.component';

describe('ThresholdDetailComponent', () => {
  let component: ThresholdDetailComponent;
  let fixture: ComponentFixture<ThresholdDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThresholdDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
