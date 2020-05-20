import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailTemplateEnComponent } from './email-template-en.component';

describe('EmailTemplateEnComponent', () => {
  let component: EmailTemplateEnComponent;
  let fixture: ComponentFixture<EmailTemplateEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTemplateEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailTemplateEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
