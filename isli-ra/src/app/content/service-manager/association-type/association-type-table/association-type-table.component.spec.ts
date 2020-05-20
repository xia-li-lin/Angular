import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationTypeTableComponent } from './association-type-table.component';

describe('AssociationTypeTableComponent', () => {
  let component: AssociationTypeTableComponent;
  let fixture: ComponentFixture<AssociationTypeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationTypeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationTypeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
