import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { NavigationComponent } from './navigation/navigation.component';
import { WebInfoComponent } from './web-info/web-info.component';
import { SharedModule } from 'src/app/shared';
import { NavigationDetailComponent } from './navigation-detail/navigation-detail.component';


@NgModule({
  declarations: [NavigationComponent, WebInfoComponent, NavigationDetailComponent],
  imports: [CommonModule, SharedModule, TreeModule],
  exports: [NavigationComponent, WebInfoComponent, NavigationDetailComponent]
})
export class SiteSettingModule { }
