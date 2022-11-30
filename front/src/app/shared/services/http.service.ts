import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseSuccess } from '../models/ResponseSuccess';
import { Table } from '../models/Table';
import { Tables } from '../models/Tables';

@Injectable({
   providedIn: 'root',
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }

  uploadfile(file:File):Observable<ResponseSuccess>{
    let formData = new FormData();
    formData.append("file", file, file.name);
    return this.httpClient.post<ResponseSuccess>("http://localhost:3000/upload/file",formData)
  }

  infoTables():Observable<Tables> {

    return this.httpClient.get<Tables>("http://localhost:3000/info/tables");
  }

  infoTable(table:string):Observable<Table> {
    return this.httpClient.get<Table>("http://localhost:3000/info/"+table);
  }

  dataTable(table:string, limit:number = 2):Observable<any> {
    return this.httpClient.get<any>("http://localhost:3000/data/"+table+"/"+limit);
  }
}

