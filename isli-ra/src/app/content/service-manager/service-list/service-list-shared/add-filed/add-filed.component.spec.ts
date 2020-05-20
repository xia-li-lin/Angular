import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFiledComponent } from './add-filed.component';

describe('AddFiledComponent', () => {
  let component: AddFiledComponent;
  let fixture: ComponentFixture<AddFiledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFiledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
