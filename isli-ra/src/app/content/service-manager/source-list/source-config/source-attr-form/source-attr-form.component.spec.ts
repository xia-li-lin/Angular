import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceAttrFormComponent } from './source-attr-form.component';

describe('SourceAttrFormComponent', () => {
  let component: SourceAttrFormComponent;
  let fixture: ComponentFixture<SourceAttrFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceAttrFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceAttrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
