import { FileTrunkUploadModule } from './file-trunk-upload.module';

describe('FileTrunkUploadModule', () => {
  let fileTrunkUploadModule: FileTrunkUploadModule;

  beforeEach(() => {
    fileTrunkUploadModule = new FileTrunkUploadModule();
  });

  it('should create an instance', () => {
    expect(fileTrunkUploadModule).toBeTruthy();
  });
});
