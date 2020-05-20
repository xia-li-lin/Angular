import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFormEnComponent } from './message-form-en.component';

describe('MessageFormEnComponent', () => {
  let component: MessageFormEnComponent;
  let fixture: ComponentFixture<MessageFormEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageFormEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFormEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
