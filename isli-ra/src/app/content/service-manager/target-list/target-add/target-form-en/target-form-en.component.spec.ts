import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetFormEnComponent } from './target-form-en.component';

describe('TargetFormEnComponent', () => {
  let component: TargetFormEnComponent;
  let fixture: ComponentFixture<TargetFormEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetFormEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetFormEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
