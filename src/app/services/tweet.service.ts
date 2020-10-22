import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BatchTweets, SingleTweet} from '../models/TweetResponse';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(
    private http: HttpClient
  ) { }

  getBatchTweet = (groupID: string, page= 1, limit= 5, userID = 'null'): Observable<BatchTweets> => {
    const params = new HttpParams()
      .set('group', groupID)
      .set('user', userID)
      .set('page', String(page))
      .set('limit', String(limit));
    return this.http.get<BatchTweets>(environment.apiBase + '/tweet/', {
      params
    });
  }

  getSingleTweet = (groupID: string, tweetID: string): Observable<SingleTweet> => {
    const params = new HttpParams()
      .set('groupID', groupID);
    return this.http.get<SingleTweet>(environment.apiBase + '/tweet/' + tweetID, {
      params
    });
  }
}
