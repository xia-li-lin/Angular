import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultingListComponent } from './consulting-list.component';

describe('ConsultingListComponent', () => {
  let component: ConsultingListComponent;
  let fixture: ComponentFixture<ConsultingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
