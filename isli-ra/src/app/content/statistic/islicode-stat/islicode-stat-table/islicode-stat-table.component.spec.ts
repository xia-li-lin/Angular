import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslicodeStatTableComponent } from './islicode-stat-table.component';

describe('IslicodeStatTableComponent', () => {
  let component: IslicodeStatTableComponent;
  let fixture: ComponentFixture<IslicodeStatTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslicodeStatTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslicodeStatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
