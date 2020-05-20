import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationTypeFormEnComponent } from './association-type-form-en.component';

describe('AssociationTypeFormEnComponent', () => {
  let component: AssociationTypeFormEnComponent;
  let fixture: ComponentFixture<AssociationTypeFormEnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationTypeFormEnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationTypeFormEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
