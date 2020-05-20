import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateServiceListComponent } from './associate-service-list.component';

describe('AssociateServiceListComponent', () => {
  let component: AssociateServiceListComponent;
  let fixture: ComponentFixture<AssociateServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateServiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
