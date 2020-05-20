import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageLastStepComponent } from './language-last-step.component';

describe('LanguageLastStepComponent', () => {
  let component: LanguageLastStepComponent;
  let fixture: ComponentFixture<LanguageLastStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageLastStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageLastStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
