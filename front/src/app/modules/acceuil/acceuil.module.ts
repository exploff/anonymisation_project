import { AcceuilLayoutComponent } from './acceuil-layout/acceuil-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { AcceuilRoutingModule } from './acceuil-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [
    AcceuilLayoutComponent
  ],
  imports: [
    CommonModule,
    AcceuilRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AcceuilModule {
}
