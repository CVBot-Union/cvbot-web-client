import {Component, Input, OnInit} from '@angular/core';
import {TweetResponse} from '../../models/TweetResponse';
import {isFullUser} from 'twitter-d';

@Component({
  selector: 'app-tweet-card',
  templateUrl: './tweet-card.component.html',
  styleUrls: ['./tweet-card.component.scss']
})
export class TweetCardComponent implements OnInit {

  isFullUser = false;

  @Input() tweet: TweetResponse;
  constructor() { }

  ngOnInit(): void {
    this.isFullUser = isFullUser(this.tweet.user);
  }

}
