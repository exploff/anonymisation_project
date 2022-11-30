import { Component, OnInit, Input } from '@angular/core';
import { Table } from 'src/app/shared/models/Table';
import { Observable } from 'rxjs';
import { DataTable } from 'src/app/shared/models/DataTable';

@Component({
  selector: 'app-columns-info',
  templateUrl: './columns-info.component.html',
  styleUrls: ['./columns-info.component.scss']
})
export class ColumnsInfoComponent implements OnInit {
  @Input()table!: Table | null;
  @Input()dataTable!: DataTable | null;

  constructor() { }

  ngOnInit(): void {
  }

}
