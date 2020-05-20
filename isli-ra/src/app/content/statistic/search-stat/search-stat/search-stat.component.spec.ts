import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStatComponent } from './search-stat.component';

describe('SearchStatComponent', () => {
  let component: SearchStatComponent;
  let fixture: ComponentFixture<SearchStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
