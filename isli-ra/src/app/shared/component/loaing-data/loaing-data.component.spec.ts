import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaingDataComponent } from './loaing-data.component';

describe('LoaingDataComponent', () => {
  let component: LoaingDataComponent;
  let fixture: ComponentFixture<LoaingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
