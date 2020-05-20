import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared';
import { ControlledWordSharedModule } from '../controlled-word-shared';
import { ControlledWordConfigComponent } from './controlled-word-config';

const routes: Route[] = [
  {
    path: '',
    component: ControlledWordConfigComponent
  }
];

@NgModule({
  declarations: [ ControlledWordConfigComponent ],
  imports: [ CommonModule, RouterModule.forChild(routes), SharedModule, ControlledWordSharedModule ]
})
export class ControlledWordConfigModule {}
