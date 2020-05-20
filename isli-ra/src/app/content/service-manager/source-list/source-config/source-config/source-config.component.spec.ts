import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceConfigComponent } from './source-config.component';

describe('SourceConfigComponent', () => {
  let component: SourceConfigComponent;
  let fixture: ComponentFixture<SourceConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
