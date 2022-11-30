import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Tables } from '../models/Tables';
import { HttpService } from '../services/http.service';

@Injectable({
  providedIn: 'root'
})
export class TablesResolver implements Resolve<Tables> {
  constructor(private httpService: HttpService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tables> {
    console.log("resolver");
    return this.httpService.infoTables();
  }
}
