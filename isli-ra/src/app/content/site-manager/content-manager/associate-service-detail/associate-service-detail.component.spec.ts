import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateServiceDetailComponent } from './associate-service-detail.component';

describe('AssociateServiceDetailComponent', () => {
  let component: AssociateServiceDetailComponent;
  let fixture: ComponentFixture<AssociateServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateServiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
