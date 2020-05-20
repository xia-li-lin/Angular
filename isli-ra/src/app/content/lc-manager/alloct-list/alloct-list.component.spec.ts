import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlloctListComponent } from './alloct-list.component';

describe('AlloctListComponent', () => {
  let component: AlloctListComponent;
  let fixture: ComponentFixture<AlloctListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlloctListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlloctListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
