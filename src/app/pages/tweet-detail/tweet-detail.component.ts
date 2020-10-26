import {Component, OnInit} from '@angular/core';
import {TweetService} from '../../services/tweet.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TweetResponse} from '../../models/TweetResponse';
import {GlobalMessageBusService} from '../../services/global-message-bus.service';
import localStorageKey from '../../const/localStorageConst';
import {environment} from '../../../environments/environment';
import {ExtendedTranslationEntity, TranslationEntity} from '../../models/TranslationResponse';

@Component({
  selector: 'app-tweet-detail',
  templateUrl: './tweet-detail.component.html',
  styleUrls: ['./tweet-detail.component.scss']
})
export class TweetDetailComponent implements OnInit {

  tweet: TweetResponse;
  cdnBase = environment.cdnBase;
  apiBase = environment.apiBase;

  groupID = '';
  tweetID: string;
  currentUserID = localStorage.getItem(localStorageKey.CURRENT_USER_ID);

  isTweetLoading = true;
  isTranslationLoading = true;
  isTranslationPosting = false;

  inputtedTranslation = '';
  decodedTranslations: ExtendedTranslationEntity[] = [];

  videoPlayerOption = {
    fluid: false,
    poster: '',
    autoplay: false,
    sources: [],
  };

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
        if (this.tweet.userNickname === undefined) {
          this.messageService.warning('该关注不在本转推组');
          this.router.navigate(['home']);
          return;
        }
        this.isTweetLoading = false;
        this.fetchTranslations(tweetID);
      }, error => {
        this.messageService.error('无法加载推文: ' + error.message);
        this.isTweetLoading = false;
        this.router.navigate(['404']);
      });
  }

  private fetchTranslations = (tweetID: string) => {
    this.inputtedTranslation = '';
    this.tweetService.getTranslations(tweetID)
      .subscribe(res => {
        this.decodedTranslations = res.response;
        this.isTranslationLoading = false;
      }, error => {
        this.messageService.error('无法加载翻译: ' + error.message);
        this.isTranslationLoading = false;
      });
  }

  private postTranslations = (translationContent: string, tweetID: string) => {
    this.isTranslationPosting = true;
    this.tweetService.putNewTranslation(tweetID, translationContent, this.groupID)
      .subscribe(res => {
        this.isTranslationPosting = false;
        if (res.response.nModified === 0) {
          this.messageService.error('无法提交翻译');
          return;
        }
        this.fetchTranslations(tweetID);
      }, error => {
        this.isTranslationPosting = false;
        this.messageService.error('无法提交翻译: ' + error.message);
      });
  }

  private deleteTranslation = (translationID: string, tweetID: string) => {
    this.isTranslationLoading = true;
    this.tweetService.deleteTranslation(tweetID, translationID)
      .subscribe(res => {
        this.isTranslationLoading = false;
        if (res.response.nModified === 0) {
          this.messageService.error('无法删除翻译');
          return;
        }
        this.fetchTranslations(tweetID);
      }, error => {
        this.isTranslationLoading = false;
        this.messageService.error('无法删除翻译: ' + error.message);
      });
  }

  onPostTranslation = () => {
    if (this.inputtedTranslation === this.getTweetText()) {
      this.messageService.warning('翻译内容与原文相符');
      return;
    }
    this.postTranslations(this.inputtedTranslation, this.tweet.id_str);
  }

  onDeleteTranslation = (id: string) => {
    this.deleteTranslation(id, this.tweet.id_str);
  }

  onCopyTranslationSuccess = () => {
    this.messageService.info('成功复制到粘贴板');
  }

  private getTweetText = (): string => {
    if (this.tweet.truncated) {
      return this.tweet.extended_tweet.full_text;
    }else {
      return this.tweet.text;
    }
  }

  onCopyOriginalTweetToTranslationField = () => {
    this.inputtedTranslation = this.getTweetText();
  }

  onBack = () => {
    this.router.navigate(['home']);
  }

  getPlayerOption = (videoID: string) => {
    this.videoPlayerOption.sources = [{
      src: this.cdnBase + '/videos/' + videoID + '.mp4',
      type: 'video/mp4'
    }];
    this.videoPlayerOption.poster = this.cdnBase + '/images/' + videoID + '.png';
    return this.videoPlayerOption;
  }

}
