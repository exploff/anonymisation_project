import { NgModule } from '@angular/core';

import { ManuelRoutingModule } from './manuel-routing.module';
import { ManuelLayoutComponent } from './manuel-layout/manuel-layout.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { FormManuelComponent } from './form-manuel/form-manuel.component';


@NgModule({
  declarations: [
    ManuelLayoutComponent,
    FormManuelComponent
  ],
  imports: [
    ManuelRoutingModule,
    SharedModule,
  ]
})
export class ManuelModule { }
