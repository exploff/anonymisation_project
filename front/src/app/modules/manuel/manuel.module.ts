import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManuelRoutingModule } from './manuel-routing.module';
import { ManuelLayoutComponent } from './manuel-layout/manuel-layout.component';


@NgModule({
  declarations: [
    ManuelLayoutComponent
  ],
  imports: [
    CommonModule,
    ManuelRoutingModule
  ]
})
export class ManuelModule { }
