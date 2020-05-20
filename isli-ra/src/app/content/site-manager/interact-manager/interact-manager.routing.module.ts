import { NgModule } from '@angular/core';
import { InteractManagerModule } from './interact-manager.module';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackListComponent } from './feedback-list/feedback-list.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { FqManagerComponent } from './fq-manager/fq-manager.component';
import { FqManagerDetailComponent } from './fq-manager-detail/fq-manager-detail.component';
import { PermissionActiveService } from 'src/app/service/permission-active.service';

const routes: Routes = [
  {
    path: 'feedbacks',
    component: FeedbackListComponent,
    data: {
      label: 'siteManager.leftNav.feedbacks',
      permission: 'WS.KH',
      reload: false
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'feedbacks/feedback-detail',
    component: FeedbackDetailComponent,
    data: {
      label: 'siteManager.leftNav.feedbacksDetail'
    }
  },
  {
    path: 'fqmanagers',
    component: FqManagerComponent,
    data: {
      label: 'siteManager.leftNav.fqmanagers',
      reload: false
    }
  },
  {
    path: 'fqmanagers/fqmanager-detail',
    component: FqManagerDetailComponent,
    data: {
      label: 'siteManager.leftNav.fqmanagersDetail'
    }
  },
  {
    path: '**',
    redirectTo: 'feedbacks'
  }
];

@NgModule({
  imports: [ InteractManagerModule, RouterModule.forChild(routes) ]
})
export class InteractManagerRoutingModule {}
