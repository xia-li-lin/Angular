import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationTypeSearchComponent } from './association-type-search.component';

describe('AssociationTypeSearchComponent', () => {
  let component: AssociationTypeSearchComponent;
  let fixture: ComponentFixture<AssociationTypeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationTypeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationTypeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
