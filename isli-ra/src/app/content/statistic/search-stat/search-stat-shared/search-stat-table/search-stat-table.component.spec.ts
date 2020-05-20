import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStatTableComponent } from './search-stat-table.component';

describe('SearchStatTableComponent', () => {
  let component: SearchStatTableComponent;
  let fixture: ComponentFixture<SearchStatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
