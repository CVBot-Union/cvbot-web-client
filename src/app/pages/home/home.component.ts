import { Component, OnInit } from '@angular/core';
import {RtgroupService} from '../../services/rtgroup.service';
import localStorageKey from '../../const/localStorageConst';
import {RTGroupMetaResponse} from '../../models/RTGroupResponse';
import {NzMessageService} from 'ng-zorro-antd/message';
import {GlobalMessageBusService} from '../../services/global-message-bus.service';
import {TweetResponse} from '../../models/TweetResponse';
import {TweetService} from '../../services/tweet.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentGroupId = '';

  groupProperty: RTGroupMetaResponse;
  selectedTrackerFromList = '';

  isLoading = true;
  isTweetFeedLoading = false;
  isTweetPartialLoading = false;

  tweets: TweetResponse[] = [];

  loadMethod: 'ALL' | 'SINGLE' = 'ALL';

  page = 1;
  limit = 20;

  constructor(
    private rtgroupService: RtgroupService,
    private tweetService: TweetService,
    private messageService: NzMessageService,
    private globalMessageBusService: GlobalMessageBusService,
    private route: ActivatedRoute
  ) { }

  private getGroupProperty = (id: string) => {
    if (id === null) {
      return;
    }
    this.isLoading = true;
    this.rtgroupService.getRTGroupMetaByID(id)
      .subscribe(res => {
        this.isLoading = false;
        this.groupProperty = res.response;
      }, error => {
        this.isLoading = false;
        this.messageService.error('无法加载转推组详情: ' + error.message);
      });
  }

  ngOnInit(): void {
    this.currentGroupId = localStorage.getItem(localStorageKey.CURRENT_GROUP);
    this.getGroupProperty(this.currentGroupId);
    this.globalMessageBusService.rtgroupChange$.subscribe(this.onRTGroupChange);
    this.getAllTweets(this.currentGroupId);
    this.route.queryParamMap.subscribe(this.onQueryChange);
  }

  onQueryChange = (paramMap: ParamMap) => {
    const loadMode = paramMap.get('mode');
    const tracker = paramMap.get('tracker');
    if (loadMode === 'ALL') {
      this.loadMethod = loadMode;
    }
    if (tracker) {
      this.selectedTrackerFromList = tracker;
    }
  }

  onRTGroupChange = (changedId: string) => {
    this.getGroupProperty(changedId);
    if (this.currentGroupId !== changedId) {
      this.tweets = [];
      this.page = 1;
      this.getAllTweets(changedId);
    }
    this.currentGroupId = changedId;
  }

  private getAllTweets = (rtgroupID: string, partialLoading = false) => {
    if (rtgroupID == null) {
      return;
    }
    this.isTweetFeedLoading = !partialLoading;
    this.isTweetPartialLoading = partialLoading;
    this.tweetService.getBatchTweet(rtgroupID, this.page, this.limit)
      .subscribe(this.tweetReceiveEvent, this.tweetReceiveErrorEvent);
  }

  private getTweetByUserId = (groupID: string, twitterUID: string, partialLoading = false) => {
    this.isTweetFeedLoading = !partialLoading;
    this.isTweetPartialLoading = partialLoading;
    this.tweetService.getBatchTweet(groupID, this.page, this.limit, twitterUID)
      .subscribe(this.tweetReceiveEvent, this.tweetReceiveErrorEvent);
  }

  private tweetReceiveEvent = (res) => {
    this.tweets = this.tweets.concat(res.response);
    this.isTweetFeedLoading = false;
    this.isTweetPartialLoading = false;
  }

  private tweetReceiveErrorEvent = (error) => {
    this.isTweetFeedLoading = false;
    this.isTweetPartialLoading = false;
    this.messageService.error('无法加载推文: ' + error.message);
  }

  onTrackerChange = (selectedTracker: string) => {
    this.tweets = [];
    this.page = 1;
    if (selectedTracker === 'ALL') {
      this.loadMethod = 'ALL';
      this.selectedTrackerFromList = '';
      this.getAllTweets(this.currentGroupId);
    } else{
      this.loadMethod = 'SINGLE';
      this.selectedTrackerFromList = selectedTracker;
      this.getTweetByUserId(this.currentGroupId, this.selectedTrackerFromList);
    }
  }

  onScroll = () => {
    this.page++;
    if (this.loadMethod === 'ALL') {
      this.getAllTweets(this.currentGroupId, true);
    }else {
      this.getTweetByUserId(this.currentGroupId, this.selectedTrackerFromList, true);
    }
  }

  private refreshPage = () => {
    this.tweets = [];
    if (this.loadMethod === 'ALL') {
      this.getAllTweets(this.currentGroupId);
    }else {
      this.getTweetByUserId(this.currentGroupId, this.selectedTrackerFromList);
    }
  }

  onRefresh = () => {
    this.refreshPage();
  }

}
