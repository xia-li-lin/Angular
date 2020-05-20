import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceManagerDialogComponent } from './service-manager-dialog.component';

describe('ServiceManagerDialogComponent', () => {
  let component: ServiceManagerDialogComponent;
  let fixture: ComponentFixture<ServiceManagerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceManagerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
