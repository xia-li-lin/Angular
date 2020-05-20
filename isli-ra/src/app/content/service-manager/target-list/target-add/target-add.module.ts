import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { TargetAddComponent } from './target-add';
import { TargetFormCnComponent } from './target-form-cn';
import { TargetFormEnComponent } from './target-form-en';

const routes: Route[] = [
  {
    path: '',
    component: TargetAddComponent
  }
];

@NgModule({
  declarations: [ TargetAddComponent, TargetFormCnComponent, TargetFormEnComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule ]
})
export class TargetAddModule {}
