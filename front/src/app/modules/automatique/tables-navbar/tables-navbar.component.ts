import { Component, OnInit } from '@angular/core';
import { Tables } from 'src/app/shared/models/Tables';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/shared/services/http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'src/app/shared/models/Table';
import { DataTable } from 'src/app/shared/models/DataTable';

@Component({
  selector: 'app-tables-navbar',
  templateUrl: './tables-navbar.component.html',
  styleUrls: ['./tables-navbar.component.scss']
})
export class TablesNavbarComponent implements OnInit {

  tables!: Tables;

  dataTable!: Observable<DataTable>;
  table!: Observable<Table>;

  tableActive!: string;

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
