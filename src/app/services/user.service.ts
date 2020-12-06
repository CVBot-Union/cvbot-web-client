import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {BatchUsers, UserDetail} from '../models/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getCurrentUserDetail = (): Observable<UserDetail> => {
    return this.http.get<UserDetail>(environment.apiBase + '/user/');
  }

  getAllUsers = (username?): Observable<BatchUsers> => {
    return this.http.get<BatchUsers>(environment.apiBase + '/user/all');
  }
}
