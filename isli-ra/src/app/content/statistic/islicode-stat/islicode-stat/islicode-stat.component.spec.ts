import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslicodeStatComponent } from './islicode-stat.component';

describe('IslicodeStatComponent', () => {
  let component: IslicodeStatComponent;
  let fixture: ComponentFixture<IslicodeStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslicodeStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslicodeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
