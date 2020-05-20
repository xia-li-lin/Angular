import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { NewsListComponent } from './news-list/news-list.component';
import { ConsultingListComponent } from './consulting-list/consulting-list.component';
import { ConsultingDetailComponent } from './consulting-detail/consulting-detail.component';
import { ContentListComponent } from './content-list/content-list.component';
import { ContentDetailComponent } from './content-detail/content-detail.component';
import { PictureListComponent } from './picture-list/picture-list.component';
import { QustionListComponent } from './qustion-list/qustion-list.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { AppExampleListComponent } from './app-example-list/app-example-list.component';
import { AppExampleDetailComponent } from './app-example-detail/app-example-detail.component';
import { AssociateServiceListComponent } from './associate-service-list/associate-service-list.component';
import { AssociateServiceDetailComponent } from './associate-service-detail/associate-service-detail.component';
import { ServiceProductListComponent } from './service-product-list/service-product-list.component';
import { ServiceProductDetailComponent } from './service-product-detail/service-product-detail.component';
import { SharedModule } from 'src/app/shared';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    NewsDetailComponent,
    NewsListComponent,
    ConsultingListComponent,
    ConsultingDetailComponent,
    ContentListComponent,
    ContentDetailComponent,
    PictureListComponent,
    QustionListComponent,
    QuestionDetailComponent,
    AppExampleListComponent,
    AppExampleDetailComponent,
    AssociateServiceListComponent,
    AssociateServiceDetailComponent,
    ServiceProductListComponent,
    ServiceProductDetailComponent
  ],
  imports: [ CommonModule, SharedModule, InputTextModule, ButtonModule, TabViewModule, DropdownModule, TableModule ],
  exports: [
    NewsDetailComponent,
    NewsListComponent,
    ConsultingListComponent,
    ConsultingDetailComponent,
    ContentListComponent,
    ContentDetailComponent,
    PictureListComponent,
    QustionListComponent,
    QuestionDetailComponent,
    AppExampleListComponent,
    AppExampleDetailComponent,
    AssociateServiceListComponent,
    AssociateServiceDetailComponent,
    ServiceProductListComponent,
    ServiceProductDetailComponent
  ]
})
export class ContentManagerModule {}
