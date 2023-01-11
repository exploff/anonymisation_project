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

  @Input()columnSelected!: Array<string>;

  constructor() { }

  ngOnInit(): void {
  }

  updateSelected(columnName: string) {
    if (this.columnSelected.includes(columnName)) {
        const index = this.columnSelected.indexOf(columnName);
        this.columnSelected.splice(index, 1);
    } else {
        this.columnSelected.push(columnName);
    }
  }

}
