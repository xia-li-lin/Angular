import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStatTopComponent } from './search-stat-top.component';

describe('SearchStatTopComponent', () => {
  let component: SearchStatTopComponent;
  let fixture: ComponentFixture<SearchStatTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStatTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStatTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
