import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BatchTweets, SingleTweet, TimelineLaggedTweetCount} from '../models/TweetResponse';
import {environment} from '../../environments/environment';
import {ExtendedTranslationResponse, UpdateTranslationObject} from '../models/TranslationResponse';

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

  getTranslations = (tweetID: string): Observable<ExtendedTranslationResponse> => {
    return this.http.get<ExtendedTranslationResponse>(environment.apiBase + '/tweet/' + tweetID + '/translations');
  }

  putNewTranslation = (tweetID: string, translationContent: string, sessionGroupID: string): Observable<UpdateTranslationObject> => {
    return this.http.put<UpdateTranslationObject>(environment.apiBase + '/tweet/' + tweetID + '/translation', {
      translationContent, sessionGroupID
    });
  }

  deleteTranslation = (tweetID: string, translationID: string): Observable<UpdateTranslationObject> => {
    return this.http.delete<UpdateTranslationObject>(environment.apiBase + '/tweet/' + tweetID +
      '/translation/' + translationID);
  }

  getTimelineLaggedTweetCount = (tweetID: string, groupID: string): Observable<TimelineLaggedTweetCount> => {
    const params = new HttpParams()
      .set('group', groupID)
      .set('afterID', tweetID);
    return this.http.get<TimelineLaggedTweetCount>(environment.apiBase + '/tweet/timeline-behind-count', {
      params
    });
  }
}
