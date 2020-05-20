import { FileTrunkUploadModule } from './file-trunk-upload/file-trunk-upload.module';
import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpMockModule } from './http-mock';
import { AppState } from './app-state.service';
import { HttpModule } from './http';
import { ImageModule } from './image';
import { SubjectModule } from './subject';
import { HttpTokenService } from './http-token.service';
import { IHttpHeaderService } from './http/http-header.service';

export class HttpUtilConfig {
  // tslint:disable-next-line:variable-name
  constructor(public pb_context = '', public mpr_context = '', public isli_context = '') {}
}

@NgModule({
  imports: [ CommonModule, ImageModule, HttpModule, SubjectModule, FileTrunkUploadModule, HttpMockModule ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config?: HttpUtilConfig): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AppState,
        {
          provide: IHttpHeaderService,
          useClass: HttpTokenService
        }
      ]
    };
  }
}
