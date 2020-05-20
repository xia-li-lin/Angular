import { TestBed } from '@angular/core/testing';

import { RegisterManagerService } from './register-manager.service';

describe('RegisterManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterManagerService = TestBed.get(RegisterManagerService);
    expect(service).toBeTruthy();
  });
});
