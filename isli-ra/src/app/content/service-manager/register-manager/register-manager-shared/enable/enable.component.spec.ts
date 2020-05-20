import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableComponent } from './enable.component';

describe('EnableComponent', () => {
  let component: EnableComponent;
  let fixture: ComponentFixture<EnableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
