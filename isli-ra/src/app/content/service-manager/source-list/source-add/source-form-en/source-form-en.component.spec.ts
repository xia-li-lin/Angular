import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceFormEnComponent } from './source-form-en.component';

describe('SourceFormEnComponent', () => {
  let component: SourceFormEnComponent;
  let fixture: ComponentFixture<SourceFormEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceFormEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceFormEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
