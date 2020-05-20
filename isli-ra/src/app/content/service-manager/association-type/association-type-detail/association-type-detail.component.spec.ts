import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationTypeDetailComponent } from './association-type-detail.component';

describe('AssociationTypeDetailComponent', () => {
  let component: AssociationTypeDetailComponent;
  let fixture: ComponentFixture<AssociationTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
