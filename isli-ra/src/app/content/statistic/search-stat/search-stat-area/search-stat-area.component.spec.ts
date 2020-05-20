import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStatAreaComponent } from './search-stat-area.component';

describe('SearchStatAreaComponent', () => {
  let component: SearchStatAreaComponent;
  let fixture: ComponentFixture<SearchStatAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStatAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStatAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
