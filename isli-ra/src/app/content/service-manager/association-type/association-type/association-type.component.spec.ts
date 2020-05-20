import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationTypeComponent } from './association-type.component';

describe('AssociationTypeComponent', () => {
  let component: AssociationTypeComponent;
  let fixture: ComponentFixture<AssociationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
