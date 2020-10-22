import {Component, OnInit} from '@angular/core';
import {TweetService} from '../../services/tweet.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TweetResponse} from '../../models/TweetResponse';
import {GlobalMessageBusService} from '../../services/global-message-bus.service';
import localStorageKey from '../../const/localStorageConst';

@Component({
  selector: 'app-tweet-detail',
  templateUrl: './tweet-detail.component.html',
  styleUrls: ['./tweet-detail.component.scss']
})
export class TweetDetailComponent implements OnInit {

  tweet: TweetResponse;

  groupID = '';
  tweetID: string;

  isTweetLoading = true;

  constructor(
    private tweetService: TweetService,
    private messageService: NzMessageService,
    private globalMessageBusService: GlobalMessageBusService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.groupID = localStorage.getItem(localStorageKey.CURRENT_GROUP);
    this.globalMessageBusService.rtgroupChange$.subscribe(this.onGroupIDChange);
    this.route.paramMap.subscribe(this.onRouteParamChange);
  }

  private onRouteParamChange = (routeParam: ParamMap) => {
    this.tweetID = routeParam.get('id');
    this.fetchTweetDetail(this.tweetID, this.groupID);
  }

  private onGroupIDChange = (groupID: string) => {
    this.groupID = groupID;
    this.fetchTweetDetail(this.tweetID, this.groupID);
  }

  private fetchTweetDetail = (tweetID: string, groupID: string) => {
    this.isTweetLoading = true;
    this.tweetService.getSingleTweet(groupID, tweetID)
      .subscribe(res => {
        this.tweet = res.response;
        if (this.tweet.userNickname === null) {
          this.messageService.warning('该关注不在本转推组');
          this.router.navigate(['home']);
          return;
        }
        this.isTweetLoading = false;
      }, error => {
        this.messageService.error('无法加载推文: ' + error.message);
        this.isTweetLoading = false;
        this.router.navigate(['404']);
      });
  }

  onBack = () => {
    this.router.navigate(['home']);
  }

}
