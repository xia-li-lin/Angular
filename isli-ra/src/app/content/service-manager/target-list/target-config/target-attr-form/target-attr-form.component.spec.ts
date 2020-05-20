import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetAttrFormComponent } from './target-attr-form.component';

describe('TargetAttrFormComponent', () => {
  let component: TargetAttrFormComponent;
  let fixture: ComponentFixture<TargetAttrFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetAttrFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetAttrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
