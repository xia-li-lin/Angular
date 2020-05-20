import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { TargetConfigComponent } from './target-config';
import { TargetAttrFormComponent } from './target-attr-form';

const routes: Route[] = [
  {
    path: '',
    component: TargetConfigComponent
  }
];

@NgModule({
  declarations: [ TargetConfigComponent, TargetAttrFormComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule ]
})
export class TargetConfigModule {}
