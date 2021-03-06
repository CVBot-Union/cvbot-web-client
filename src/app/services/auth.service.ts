import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthCreateResponseRootObject, AuthLogin} from '../models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login = (username: string, password: string): Observable<AuthLogin> => {
    return this.http.post<AuthLogin>(environment.apiBase + '/auth/login', {
      username, password
    });
  }

  signup = (username: string, password: string): Observable<AuthCreateResponseRootObject> => {
    return this.http.post<AuthCreateResponseRootObject>(environment.apiBase + '/auth/create', {
      username, password
    });
  }
}
