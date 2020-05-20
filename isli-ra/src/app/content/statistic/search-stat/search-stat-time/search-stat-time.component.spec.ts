import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStatTimeComponent } from './search-stat-time.component';

describe('SearchStatTimeComponent', () => {
  let component: SearchStatTimeComponent;
  let fixture: ComponentFixture<SearchStatTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStatTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStatTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
