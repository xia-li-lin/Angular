import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslicodeStatSearchComponent } from './islicode-stat-search.component';

describe('IslicodeStatSearchComponent', () => {
  let component: IslicodeStatSearchComponent;
  let fixture: ComponentFixture<IslicodeStatSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslicodeStatSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslicodeStatSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
