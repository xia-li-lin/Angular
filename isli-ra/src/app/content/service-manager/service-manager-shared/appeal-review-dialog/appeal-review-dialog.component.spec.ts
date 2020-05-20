import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppealReviewDialogComponent } from './appeal-review-dialog.component';

describe('AppealReviewDialogComponent', () => {
  let component: AppealReviewDialogComponent;
  let fixture: ComponentFixture<AppealReviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppealReviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppealReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
