import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule
  ],
  exports: [
    CommonModule,
    MatPaginatorModule
  ],
  declarations: []
})
export class SharedModule { }
