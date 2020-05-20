import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStatSearchComponent } from './search-stat-search.component';

describe('SearchStatSearchComponent', () => {
  let component: SearchStatSearchComponent;
  let fixture: ComponentFixture<SearchStatSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStatSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
