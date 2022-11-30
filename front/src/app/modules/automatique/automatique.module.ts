import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutomatiqueRoutingModule } from './automatique-routing.module';
import { AutomatiqueLayoutComponent } from './automatique-layout/automatique-layout.component';
import { TablesNavbarComponent } from './tables-navbar/tables-navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ColumnsInfoComponent } from './tables-navbar/columns-info/columns-info.component';


@NgModule({
  declarations: [
    AutomatiqueLayoutComponent,
    TablesNavbarComponent,
    ColumnsInfoComponent
  ],
  imports: [
    MatSidenavModule,
    CommonModule,
    AutomatiqueRoutingModule
  ]
})
export class AutomatiqueModule { }
