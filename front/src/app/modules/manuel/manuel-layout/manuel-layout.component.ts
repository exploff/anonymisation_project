import { DataTable } from 'src/app/shared/models/DataTable'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpService } from 'src/app/shared/services/http.service'
import { Table } from 'src/app/shared/models/Table'
import { Tables } from 'src/app/shared/models/Tables'
import { Component, OnInit } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-manuel-layout',
  templateUrl: './manuel-layout.component.html',
  styleUrls: ['./manuel-layout.component.scss']
})
export class ManuelLayoutComponent implements OnInit {
  length = 100
  pageSize = 10
  pageSizeOptions = [5, 10, 25]
  // MatPaginator Output
  pageEvent!: PageEvent
  tables!: Tables
  dataTable!: Observable<DataTable>;
  table!: Observable<Table>;

  tableActive!: string
  displayedColumns: string[] = ['Donnee', 'Type', 'Proposition', 'Choix']
  dataSource:ligneTableau[]=[]

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.data['tables'] != undefined) {
      this.tables = this.route.snapshot.data['tables']
    }
  }

  changeTable(table: string) {
    this.tableActive = table
    this.table = this.httpService.infoTable(table)
    this.dataTable = this.httpService.dataTable(table, this.pageSize)

    this.dataTable.subscribe(val=>{
      if(val.data){
        this.table.subscribe(tableinfo=>{
          let tableauSource:ligneTableau[]=[]
          for(let ligne of val.data){
            for(let colonne of tableinfo.columns){
              let ligneTB:ligneTableau={
                Donnee:ligne[colonne.name],
                Type:colonne.type,
                Proposition:'à faire',
                Choix:'à faire'
              }
              tableauSource.push(ligneTB)
              // console.log(ligne[colonne.name],colonne.type)
            }
          }
          this.dataSource=tableauSource
          console.log(this.dataSource)
        })

      }
    })

  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
  }

  onPageEvent(event:PageEvent){
    console.log(event)

  }

}

export interface ligneTableau {
  Donnee: string;
  Type: string;
  Proposition: string;
  Choix: any;
}
