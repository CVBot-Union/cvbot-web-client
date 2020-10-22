import {Component, Input, OnInit} from '@angular/core';
import {MediaEntity} from 'twitter-d';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-tweet-image-list',
  templateUrl: './tweet-image-list.component.html',
  styleUrls: ['./tweet-image-list.component.scss']
})
export class TweetImageListComponent implements OnInit {

  @Input() mediaList: MediaEntity[];
  cdnBase = environment.cdnBase;
  constructor() { }

  ngOnInit(): void {
  }

}
