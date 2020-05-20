import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpApplyAddServiceTableComponent } from './sp-apply-add-service-table.component';

describe('SpApplyAddServiceTableComponent', () => {
  let component: SpApplyAddServiceTableComponent;
  let fixture: ComponentFixture<SpApplyAddServiceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpApplyAddServiceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpApplyAddServiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
