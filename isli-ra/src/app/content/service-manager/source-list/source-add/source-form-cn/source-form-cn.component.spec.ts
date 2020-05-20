import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceFormCnComponent } from './source-form-cn.component';

describe('SourceFormCnComponent', () => {
  let component: SourceFormCnComponent;
  let fixture: ComponentFixture<SourceFormCnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceFormCnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceFormCnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
