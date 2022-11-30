import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-manuel-layout',
  templateUrl: './manuel-layout.component.html',
  styleUrls: ['./manuel-layout.component.scss']
})
export class ManuelLayoutComponent implements OnInit {
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25];
  // MatPaginator Output
  pageEvent!: PageEvent;

  constructor() { }

  ngOnInit() {
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  onPageEvent(event:PageEvent){
    console.log(event);

  }

}
