import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginService } from './login.service';
import { UeditorUploadService } from './ueditor-upload.service';
import { UserService } from './user.service';
import { AreaManagerService } from './area-manager.service';
import { CommonService } from './common.service';
import { LCManagerService } from './lc-manager.service';
import { SystemService } from './system.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LoginService, UeditorUploadService, UserService, AreaManagerService, CommonService, LCManagerService,
    SystemService]
})
export class ServiceModule { }
