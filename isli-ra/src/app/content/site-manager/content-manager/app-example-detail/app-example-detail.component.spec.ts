import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExampleDetailComponent } from './app-example-detail.component';

describe('AppExampleDetailComponent', () => {
  let component: AppExampleDetailComponent;
  let fixture: ComponentFixture<AppExampleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppExampleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExampleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
