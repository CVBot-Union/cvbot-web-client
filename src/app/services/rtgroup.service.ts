import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {RTGroupDetail} from '../models/RTGroupResponse';

@Injectable({
  providedIn: 'root'
})
export class RtgroupService {

  constructor(
    private http: HttpClient
  ) { }

  getRTGroupByID = (id: string): Observable<RTGroupDetail> => {
    return this.http.get<RTGroupDetail>(environment.apiBase + '/rtgroup/' + id);
  }
}
