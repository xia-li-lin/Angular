import { TestBed } from '@angular/core/testing';

import { ServiceFormService } from './service-form.service';

describe('ServiceFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceFormService = TestBed.get(ServiceFormService);
    expect(service).toBeTruthy();
  });
});
