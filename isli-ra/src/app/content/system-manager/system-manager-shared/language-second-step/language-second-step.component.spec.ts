import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSecondStepComponent } from './language-second-step.component';

describe('LanguageSecondStepComponent', () => {
  let component: LanguageSecondStepComponent;
  let fixture: ComponentFixture<LanguageSecondStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageSecondStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSecondStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
