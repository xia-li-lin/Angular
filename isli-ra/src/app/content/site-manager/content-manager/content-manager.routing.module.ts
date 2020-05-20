import { NgModule } from '@angular/core';
import { ContentManagerModule } from './content-manager.module';
import { Routes, RouterModule } from '@angular/router';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { ConsultingListComponent } from './consulting-list/consulting-list.component';
import { ConsultingDetailComponent } from './consulting-detail/consulting-detail.component';
import { ContentListComponent } from './content-list/content-list.component';
import { ContentDetailComponent } from './content-detail/content-detail.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { AppExampleListComponent } from './app-example-list/app-example-list.component';
import { AppExampleDetailComponent } from './app-example-detail/app-example-detail.component';
import { QustionListComponent } from './qustion-list/qustion-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { AssociateServiceListComponent } from './associate-service-list/associate-service-list.component';
import { AssociateServiceDetailComponent } from './associate-service-detail/associate-service-detail.component';
import { ServiceProductListComponent } from './service-product-list/service-product-list.component';
import { ServiceProductDetailComponent } from './service-product-detail/service-product-detail.component';
import { PermissionActiveService } from 'src/app/service/permission-active.service';

const routes: Routes = [
  {
    path: 'news',
    component: NewsListComponent,
    data: {
      label: 'siteManager.leftNav.news',
      permission: 'WS.XW',
      reload: false
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'news/add',
    component: NewsDetailComponent,
    data: {
      label: 'siteManager.leftNav.newsAdd',
      permission: 'WS.XW'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'news/news-detail',
    component: NewsDetailComponent,
    data: {
      label: 'siteManager.leftNav.newsDetail'
    }
  },
  {
    path: 'consulting',
    component: ConsultingListComponent,
    data: {
      label: 'siteManager.leftNav.consulting',
      reload: false
    }
  },
  {
    path: 'consulting/consulting-detail',
    component: ConsultingDetailComponent,
    data: {
      label: 'siteManager.leftNav.consultingDetail'
    }
  },
  {
    path: 'consulting/add',
    component: ConsultingDetailComponent,
    data: {
      label: 'siteManager.leftNav.consultingAdd'
    }
  },
  {
    path: 'content',
    component: ContentListComponent,
    data: {
      label: 'siteManager.leftNav.content',
      permission: 'WS.NR'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'content/content-detail',
    component: ContentDetailComponent,
    data: {
      label: 'siteManager.leftNav.contentDetail'
    }
  },
  {
    path: 'picture',
    component: PictureListComponent,
    data: {
      label: 'siteManager.leftNav.picture',
      permission: 'WS.TP'
    },
    canActivate: [ PermissionActiveService ]
  },
  {
    path: 'app-examples',
    component: AppExampleListComponent,
    data: {
      label: 'siteManager.leftNav.appExamples',
      reload: false
    }
  },
  {
    path: 'app-examples/add',
    component: AppExampleDetailComponent,
    data: {
      label: 'siteManager.leftNav.appExampleAdd'
    }
  },
  {
    path: 'app-examples/app-example-detail',
    component: AppExampleDetailComponent,
    data: {
      label: 'siteManager.leftNav.appExampleDetail'
    }
  },
  {
    path: 'questions',
    component: QustionListComponent,
    data: {
      label: 'siteManager.leftNav.questions',
      reload: false
    }
  },
  {
    path: 'questions/add',
    component: QuestionDetailComponent,
    data: {
      label: 'siteManager.leftNav.questionsAdd'
    }
  },
  {
    path: 'questions/question-detail',
    component: QuestionDetailComponent,
    data: {
      label: 'siteManager.leftNav.questionsDetail'
    }
  },
  {
    path: 'associates',
    component: AssociateServiceListComponent,
    data: {
      label: 'siteManager.leftNav.associates',
      reload: false
    }
  },
  {
    path: 'associates/add',
    component: AssociateServiceDetailComponent,
    data: {
      label: 'siteManager.leftNav.associatesAdd'
    }
  },
  {
    path: 'associates/associate-detail',
    component: AssociateServiceDetailComponent,
    data: {
      label: 'siteManager.leftNav.associatesDetail'
    }
  },
  {
    path: 'products',
    component: ServiceProductListComponent,
    data: {
      label: 'siteManager.leftNav.products',
      reload: false
    }
  },
  {
    path: 'products/add',
    component: ServiceProductDetailComponent,
    data: {
      label: 'siteManager.leftNav.productsAdd'
    }
  },
  {
    path: 'products/product-detail',
    component: ServiceProductDetailComponent,
    data: {
      label: 'siteManager.leftNav.productsAddDetail'
    }
  },
  {
    path: '**',
    redirectTo: 'news'
  }
];

@NgModule({
  imports: [ ContentManagerModule, RouterModule.forChild(routes) ]
})
export class ContentManagerRoutingModule {}
