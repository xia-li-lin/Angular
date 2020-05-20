import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { SourceConfigComponent } from './source-config';
import { SourceAttrFormComponent } from './source-attr-form';

const routes: Route[] = [
  {
    path: '',
    component: SourceConfigComponent
  }
];

@NgModule({
  declarations: [ SourceConfigComponent, SourceAttrFormComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule ]
})
export class SourceConfigModule {}
