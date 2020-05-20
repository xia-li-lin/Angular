import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplateTwComponent } from './email-template-tw.component';

describe('EmailTemplateTwComponent', () => {
  let component: EmailTemplateTwComponent;
  let fixture: ComponentFixture<EmailTemplateTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTemplateTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTemplateTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
