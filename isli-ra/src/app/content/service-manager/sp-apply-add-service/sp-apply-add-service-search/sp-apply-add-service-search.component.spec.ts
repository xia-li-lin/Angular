import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpApplyAddServiceSearchComponent } from './sp-apply-add-service-search.component';

describe('SpApplyAddServiceSearchComponent', () => {
  let component: SpApplyAddServiceSearchComponent;
  let fixture: ComponentFixture<SpApplyAddServiceSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpApplyAddServiceSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpApplyAddServiceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
