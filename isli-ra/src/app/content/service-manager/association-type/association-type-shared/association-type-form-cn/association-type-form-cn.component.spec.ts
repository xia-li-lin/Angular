import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationTypeFormCnComponent } from './association-type-form-cn.component';

describe('AssociationTypeFormCnComponent', () => {
  let component: AssociationTypeFormCnComponent;
  let fixture: ComponentFixture<AssociationTypeFormCnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationTypeFormCnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationTypeFormCnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
