import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UEditorComponent } from './ueditor.component';

describe('UeditorComponent', () => {
  let component: UEditorComponent;
  let fixture: ComponentFixture<UEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
