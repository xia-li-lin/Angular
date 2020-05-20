import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationTypeFormComponent } from './association-type-form.component';

describe('AssociationTypeFormComponent', () => {
  let component: AssociationTypeFormComponent;
  let fixture: ComponentFixture<AssociationTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
