import { TestBed, inject } from '@angular/core/testing';

import { HttpUploadReponseConvertService } from './http-upload-reponse-convert.service';

describe('HttpUploadReponseConvertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpUploadReponseConvertService]
    });
  });

  it('should be created', inject([HttpUploadReponseConvertService], (service: HttpUploadReponseConvertService) => {
    expect(service).toBeTruthy();
  }));
});
