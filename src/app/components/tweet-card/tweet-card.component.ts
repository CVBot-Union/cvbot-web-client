import {Component, Input, OnInit} from '@angular/core';
import {TweetResponse} from '../../models/TweetResponse';
import {isFullUser} from 'twitter-d';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {

  isFullUser = false;
  apiBase = environment.apiBase;

  videoPlayerOption = {
    fluid: false,
    poster: '',
    autoplay: false,
    sources: [],
  };

  cdnBase = environment.cdnBase;

  @Input() tweet: TweetResponse;
  constructor() { }

  ngOnInit(): void {
    this.isFullUser = isFullUser(this.tweet.user);
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
