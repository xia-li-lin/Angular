import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetFormCnComponent } from './target-form-cn.component';

describe('TargetFormCnComponent', () => {
  let component: TargetFormCnComponent;
  let fixture: ComponentFixture<TargetFormCnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetFormCnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetFormCnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
