import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpApplyAddServiceComponent } from './sp-apply-add-service.component';

describe('SpApplyAddServiceComponent', () => {
  let component: SpApplyAddServiceComponent;
  let fixture: ComponentFixture<SpApplyAddServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpApplyAddServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpApplyAddServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
