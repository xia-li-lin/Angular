import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAffixComponent } from './upload-affix.component';

describe('UploadAffixComponent', () => {
  let component: UploadAffixComponent;
  let fixture: ComponentFixture<UploadAffixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadAffixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadAffixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
