import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageFirstStepComponent } from './language-first-step.component';

describe('LanguageFirstStepComponent', () => {
  let component: LanguageFirstStepComponent;
  let fixture: ComponentFixture<LanguageFirstStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageFirstStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageFirstStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
