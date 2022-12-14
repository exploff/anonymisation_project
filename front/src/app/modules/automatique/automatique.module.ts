import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutomatiqueRoutingModule } from './automatique-routing.module';
import { AutomatiqueLayoutComponent } from './automatique-layout/automatique-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ColumnsInfoComponent } from './columns-info/columns-info.component';
import { FormAnonymisationComponent } from './form-anonymisation/form-anonymisation.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';


@NgModule({
  declarations: [
    AutomatiqueLayoutComponent,
    ColumnsInfoComponent,
    FormAnonymisationComponent
  ],
  imports: [
    MatSidenavModule,
    CommonModule,
    SharedModule,
    AutomatiqueRoutingModule
  ]
})
export class AutomatiqueModule { }
