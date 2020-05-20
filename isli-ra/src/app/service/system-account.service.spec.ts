import { TestBed } from '@angular/core/testing';

import { SystemAccountService } from './system-account.service';

describe('SystemAccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemAccountService = TestBed.get(SystemAccountService);
    expect(service).toBeTruthy();
  });
});
