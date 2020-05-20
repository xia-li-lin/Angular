import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealWithComponent } from './deal-with.component';

describe('DealWithComponent', () => {
  let component: DealWithComponent;
  let fixture: ComponentFixture<DealWithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealWithComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealWithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
