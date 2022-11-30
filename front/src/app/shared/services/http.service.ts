import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root',
})
export class HttpService {

constructor(private httpClient:HttpClient) { }

uploadfile(file:File):Observable<Object>{
  let formData = new FormData();
  formData.append("file", file, file.name);
  return this.httpClient.post("http://localhost:3000/upload/file",formData)
}
}
