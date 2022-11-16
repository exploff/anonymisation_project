import { AcceuilLayoutComponent } from './acceuil-layout/acceuil-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcceuilRoutingModule } from './acceuil-routing.module';


@NgModule({
  declarations: [
    AcceuilLayoutComponent
  ],
  imports: [
    CommonModule,
    AcceuilRoutingModule
  ]
})
export class AcceuilModule { }
