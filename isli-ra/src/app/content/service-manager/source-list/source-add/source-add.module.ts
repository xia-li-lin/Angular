import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { SourceAddComponent } from './source-add';
import { SourceFormCnComponent } from './source-form-cn';
import { SourceFormEnComponent } from './source-form-en';

const routes: Route[] = [
  {
    path: '',
    component: SourceAddComponent
  }
];

@NgModule({
  declarations: [ SourceAddComponent, SourceFormCnComponent, SourceFormEnComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule ]
})
export class SourceAddModule {}
