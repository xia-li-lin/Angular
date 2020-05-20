import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FqManagerDetailComponent } from './fq-manager-detail.component';

describe('FqManagerDetailComponent', () => {
  let component: FqManagerDetailComponent;
  let fixture: ComponentFixture<FqManagerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FqManagerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FqManagerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
