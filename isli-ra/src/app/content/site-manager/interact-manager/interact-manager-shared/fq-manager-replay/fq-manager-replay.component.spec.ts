import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FqManagerReplayComponent } from './fq-manager-replay.component';

describe('FqManagerReplayComponent', () => {
  let component: FqManagerReplayComponent;
  let fixture: ComponentFixture<FqManagerReplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FqManagerReplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FqManagerReplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
