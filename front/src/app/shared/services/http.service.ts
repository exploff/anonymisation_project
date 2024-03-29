import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnonymisationAutomatique } from '../models/AnonymisationAutomatique';
import { DataTable } from '../models/DataTable';
import { Response } from '../models/Response';
import { Table } from '../models/Table';
import { Tables } from '../models/Tables';
import { environment } from 'src/environments/environment';
import { ManuelResponse } from '../models/ManuelResponse';
import { AnonymisationManuel } from '../models/AnonymisationManuel';

@Injectable({
   providedIn: 'root',
})
export class HttpService {

  constructor(private httpClient:HttpClient) { }

  uploadfile(file:File):Observable<Response>{
    let formData = new FormData();
    formData.append("file", file, file.name);
    return this.httpClient.post<Response>(environment.serverAddress + "/upload/file",formData)
  }

  infoTables():Observable<Tables> {
    console.log("######################")
    console.log(environment.serverAddress)
    console.log(environment)
    console.log("######################")
    return this.httpClient.get<Tables>(environment.serverAddress + "/info/tables");
  }

  infoTable(table:string):Observable<Table> {
    return this.httpClient.get<Table>(environment.serverAddress + "/info/"+table);
  }

  dataTable(table:string, limit:number = 2):Observable<DataTable> {
    return this.httpClient.get<DataTable>(environment.serverAddress + "/info/data/"+table+"/"+limit);
  }

  dataTableManuel(table:string):Observable<ManuelResponse[]> {
    return this.httpClient.get<ManuelResponse[]>(environment.serverAddress + "/form/anonymisation/manuel/"+table);
  }

  formAnonymisationAutomatique(anonymisationForm:AnonymisationAutomatique):Observable<Response> {
    console.log(anonymisationForm)
    if (anonymisationForm.typeAnonymisation == "Suppression") {
      return this.httpClient.post<Response>(environment.serverAddress + "/form/anonymisation/automatique/suppression", anonymisationForm);
    } else if (anonymisationForm.typeAnonymisation == "Character Masking") {
      return this.httpClient.post<Response>(environment.serverAddress + "/form/anonymisation/automatique/masking", anonymisationForm);
    } else if(anonymisationForm.typeAnonymisation == "Randomisation") {
      return this.httpClient.post<Response>(environment.serverAddress + "/form/anonymisation/automatique/randomisation", anonymisationForm);
    } else {
      throw('Type anonymisation non reconnu');
    }
  }

  formAnonymisationManuel(anonymisationForm:AnonymisationManuel):Observable<Response> {
    console.log(anonymisationForm)
    if (anonymisationForm.typeAnonymisation == "Suppression") {
      return this.httpClient.post<Response>(environment.serverAddress + "/form/anonymisation/manuel/" + anonymisationForm.table + "/suppression", anonymisationForm);
    } else if (anonymisationForm.typeAnonymisation == "Character Masking") {
      return this.httpClient.post<Response>(environment.serverAddress + "/form/anonymisation/manuel/" + anonymisationForm.table + "/masking", anonymisationForm);
    } else if(anonymisationForm.typeAnonymisation == "Randomisation") {
      return this.httpClient.post<Response>(environment.serverAddress + "/form/anonymisation/manuel/" + anonymisationForm.table + "/randomisation", anonymisationForm);
    } else {
      throw('Type anonymisation non reconnu');
    }
  }

}

