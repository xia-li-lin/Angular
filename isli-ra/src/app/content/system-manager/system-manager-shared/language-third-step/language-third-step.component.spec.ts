import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageThirdStepComponent } from './language-third-step.component';

describe('LanguageThirdStepComponent', () => {
  let component: LanguageThirdStepComponent;
  let fixture: ComponentFixture<LanguageThirdStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageThirdStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageThirdStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
