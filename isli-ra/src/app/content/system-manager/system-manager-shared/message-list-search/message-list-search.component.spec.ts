import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageListSearchComponent } from './message-list-search.component';

describe('MessageListSearchComponent', () => {
  let component: MessageListSearchComponent;
  let fixture: ComponentFixture<MessageListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
