import { DataTable } from 'src/app/shared/models/DataTable'
import { Observable } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router'
import { HttpService } from 'src/app/shared/services/http.service'
import { Table } from 'src/app/shared/models/Table'
import { Tables } from 'src/app/shared/models/Tables'
import { Component, OnInit, Input } from '@angular/core'
import { PageEvent } from '@angular/material/paginator'
import { ManuelResponse } from 'src/app/shared/models/ManuelResponse'
import { LigneTableau } from 'src/app/shared/models/LigneTableau'

@Component({
  selector: 'app-manuel-layout',
  templateUrl: './manuel-layout.component.html',
  styleUrls: ['./manuel-layout.component.scss']
})
export class ManuelLayoutComponent implements OnInit {

  // MatPaginator Output
  pageEvent!: PageEvent
  tables!: Tables
  dataTable!: Observable<DataTable>;
  table!: Observable<Table>;

  tableActive!: string
  displayedColumns: string[] = ['Donnee', 'Column', 'Type', 'Choix']
  dataSource:LigneTableau[]=[]
  dataSourceGlobale:LigneTableau[]=[]

  columnSelected: Array<LigneTableau> = [];

  isLoading:boolean=false;
  hasResult:boolean=true;

  length = 10
  pageSize = 10
  pageIndex = 0
  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.route.snapshot.data['tables'] != undefined) {
      this.tables = this.route.snapshot.data['tables']
    }
  }

  changeTable(table: string) {
    this.columnSelected = [];
    this.tableActive = table
    this.table = this.httpService.infoTable(table)
    this.dataSource=[];
    this.isLoading=true;
    this.hasResult=true;

    let manuelResult:Observable<ManuelResponse[]>= this.httpService.dataTableManuel(table)
    manuelResult.subscribe(val=>{
      if(val){
          let tableauSource:LigneTableau[]=[]
          var i = 0;
          for(let ligne of val){
            let columnName = ligne.column;
            for(let col of ligne.results){
              let ligneTB:LigneTableau={
                Selected:false,
                Index: i,
                Column: columnName,
                Donnee:col.value,
                Type:col.type,
                Proposition:'à faire',
                Choix:'à faire'
              }
              tableauSource.push(ligneTB)
              i++;
            }
          }
          console.log(tableauSource)

          this.length = tableauSource.length
          if(this.length >10){
            this.pageSize = 10
          }else{
            this.pageSize = this.length
          }
          this.isLoading=false;
          this.dataSourceGlobale=tableauSource
          this.dataSource=this.dataSourceGlobale.slice(0, this.pageSize);
          if(this.dataSource.length==0){
            this.hasResult=false;
          }

      }
    })

  }

  // setPageSizeOptions(setPageSizeOptionsInput: string) {
  //   this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
  // }

  onPageEvent(event:PageEvent){
    let start= event.pageIndex*event.pageSize
    let end = start+event.pageSize;

    this.dataSource= this.dataSourceGlobale.slice(start, end)

  }

  updateSelected(index: number) {
    let ligneTableau = this.dataSource.filter(ligne => ligne.Index == index)[0];

    if (this.columnSelected.includes(ligneTableau)) {
      this.columnSelected = this.columnSelected.filter(ligne => ligne.Index != index);
    } else {
      this.columnSelected.push(ligneTableau);
    }
  }

  refreshData(event:string) {
    console.log("refresh ?")
    this.changeTable(this.tableActive);
  }
}

