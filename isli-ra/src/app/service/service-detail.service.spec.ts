import { TestBed } from '@angular/core/testing';

import { ServiceDetailService } from './service-detail.service';

describe('ServiceDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceDetailService = TestBed.get(ServiceDetailService);
    expect(service).toBeTruthy();
  });
});
