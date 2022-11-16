import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutomatiqueRoutingModule } from './automatique-routing.module';
import { AutomatiqueLayoutComponent } from './automatique-layout/automatique-layout.component';


@NgModule({
  declarations: [
    AutomatiqueLayoutComponent
  ],
  imports: [
    CommonModule,
    AutomatiqueRoutingModule
  ]
})
export class AutomatiqueModule { }
