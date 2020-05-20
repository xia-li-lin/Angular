import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QustionListComponent } from './qustion-list.component';

describe('QustionListComponent', () => {
  let component: QustionListComponent;
  let fixture: ComponentFixture<QustionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QustionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QustionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
