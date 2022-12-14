import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataTable } from 'src/app/shared/models/DataTable';
import { Table } from 'src/app/shared/models/Table';
import { Tables } from 'src/app/shared/models/Tables';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-automatique-layout',
  templateUrl: './automatique-layout.component.html',
  styleUrls: ['./automatique-layout.component.scss']
})
export class AutomatiqueLayoutComponent implements OnInit {

  tables!: Tables;

  dataTable!: Observable<DataTable>;
  table!: Observable<Table>;

  tableActive!: string;

  columnSelected: Array<string> = [];

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) {
    if (this.route.snapshot.data['tables'] != undefined) {
      this.tables = this.route.snapshot.data['tables'];
      console.log(this.tables)
    }
  }
  ngOnInit(): void {
  }

  changeTable(table: string) {
    this.tableActive = table;
    this.table = this.httpService.infoTable(table);
    this.dataTable = this.httpService.dataTable(table, 5);
  }

}
