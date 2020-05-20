import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceAddListComponent } from './service-add-list/service-add-list.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { SharedModule } from 'src/app/shared';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [ ServiceAddListComponent, ServiceListComponent ],
  imports: [ CommonModule, SharedModule, InputTextModule, ButtonModule, TableModule, DropdownModule ],
  exports: [ ServiceAddListComponent, ServiceListComponent ]
})
export class ServiceManagerModule {}
