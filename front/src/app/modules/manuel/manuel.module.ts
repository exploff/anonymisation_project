import { NgModule } from '@angular/core';

import { ManuelRoutingModule } from './manuel-routing.module';
import { ManuelLayoutComponent } from './manuel-layout/manuel-layout.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [
    ManuelLayoutComponent
  ],
  imports: [
    ManuelRoutingModule,
    SharedModule,
  ]
})
export class ManuelModule { }
