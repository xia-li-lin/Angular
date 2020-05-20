import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFormTwComponent } from './message-form-tw.component';

describe('MessageFormTwComponent', () => {
  let component: MessageFormTwComponent;
  let fixture: ComponentFixture<MessageFormTwComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageFormTwComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFormTwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
