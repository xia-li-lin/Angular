import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FqManagerComponent } from './fq-manager.component';

describe('FqManagerComponent', () => {
  let component: FqManagerComponent;
  let fixture: ComponentFixture<FqManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FqManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FqManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
