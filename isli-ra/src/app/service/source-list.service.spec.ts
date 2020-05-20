import { TestBed } from '@angular/core/testing';

import { SourceListService } from './source-list.service';

describe('SourceListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SourceListService = TestBed.get(SourceListService);
    expect(service).toBeTruthy();
  });
});
