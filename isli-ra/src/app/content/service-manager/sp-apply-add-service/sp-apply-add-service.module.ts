import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { SystemManagerModule } from 'src/app/content/system-manager/system-manager.module';
import { SpApplyAddServiceComponent } from './sp-apply-add-service';
import { SpApplyAddServiceSearchComponent } from './sp-apply-add-service-search';
import { SpApplyAddServiceTableComponent } from './sp-apply-add-service-table';

const routes: Route[] = [
  {
    path: '',
    component: SpApplyAddServiceComponent
  }
];

@NgModule({
  declarations: [ SpApplyAddServiceComponent, SpApplyAddServiceSearchComponent, SpApplyAddServiceTableComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule, SystemManagerModule ]
})
export class SpApplyAddServiceModule {}
