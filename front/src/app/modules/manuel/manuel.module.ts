import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManuelRoutingModule } from './manuel-routing.module';
import { ManuelLayoutComponent } from './manuel-layout/manuel-layout.component';
import {MatPaginatorModule} from '@angular/material/paginator'
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [
    ManuelLayoutComponent
  ],
  imports: [
    ManuelRoutingModule,
    SharedModule
  ]
})
export class ManuelModule { }
