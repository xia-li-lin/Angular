import { TestBed, inject } from '@angular/core/testing';

import { FileUploadHttpService } from './file-upload-http.service';

describe('FileUploadHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUploadHttpService]
    });
  });

  it('should be created', inject([FileUploadHttpService], (service: FileUploadHttpService) => {
    expect(service).toBeTruthy();
  }));
});
