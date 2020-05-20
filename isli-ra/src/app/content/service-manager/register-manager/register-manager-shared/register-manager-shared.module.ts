import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { SharedModule } from 'src/app/shared';
import { CheckSystemDataComponent } from './check-system-data';
import { ForzenComponent } from './forzen';
import { EnableComponent } from './enable';
import { StopComponent } from './stop';

@NgModule({
  declarations: [ CheckSystemDataComponent, ForzenComponent, EnableComponent, StopComponent ],
  imports: [ CommonModule, SharedModule, ClipboardModule ],
  exports: [ CheckSystemDataComponent, ForzenComponent, EnableComponent, StopComponent ]
})
export class RegisterManagerSharedModule {}
