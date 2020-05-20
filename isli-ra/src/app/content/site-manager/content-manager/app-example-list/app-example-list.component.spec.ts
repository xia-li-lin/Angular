import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExampleListComponent } from './app-example-list.component';

describe('AppExampleListComponent', () => {
  let component: AppExampleListComponent;
  let fixture: ComponentFixture<AppExampleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppExampleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExampleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
