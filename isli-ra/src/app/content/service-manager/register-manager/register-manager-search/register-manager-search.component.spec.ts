import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterManagerSearchComponent } from './register-manager-search.component';

describe('RegisterManagerSearchComponent', () => {
  let component: RegisterManagerSearchComponent;
  let fixture: ComponentFixture<RegisterManagerSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterManagerSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterManagerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
