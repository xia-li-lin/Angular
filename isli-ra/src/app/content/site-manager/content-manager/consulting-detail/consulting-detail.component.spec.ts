import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultingDetailComponent } from './consulting-detail.component';

describe('ConsultingDetailComponent', () => {
  let component: ConsultingDetailComponent;
  let fixture: ComponentFixture<ConsultingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
