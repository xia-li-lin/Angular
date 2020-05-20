import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForzenComponent } from './forzen.component';

describe('ForzenComponent', () => {
  let component: ForzenComponent;
  let fixture: ComponentFixture<ForzenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForzenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForzenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
