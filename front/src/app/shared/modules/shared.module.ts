import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import {  MatTableModule} from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatRadioModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  exports: [
    CommonModule,
    MatPaginatorModule,
    MatRadioModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class SharedModule { }
