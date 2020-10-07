import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {MetaUser, UserDetail} from '../models/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getUserMetaByID = (id: string): Observable<MetaUser> => {
    return this.http.get<MetaUser>(environment.apiBase + '/user/' + id + '/meta');
  }

  getCurrentUserDetail = (): Observable<UserDetail> => {
    return this.http.get<UserDetail>(environment.apiBase + '/user/');
  }
}
