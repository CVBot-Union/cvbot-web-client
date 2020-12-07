import {Component, Input, OnInit} from '@angular/core';
import {MediaEntity} from 'twitter-d';
import {environment} from '../../../environments/environment';
import {Lightbox} from 'ngx-lightbox';

@Component({
  selector: 'app-tweet-image-list',
  templateUrl: './tweet-image-list.component.html',
  styleUrls: ['./tweet-image-list.component.scss']
})
export class TweetImageListComponent implements OnInit {

  @Input() mediaList: MediaEntity[];
  cdnBase = environment.cdnBase;
  remappedImageLink: any[] = [];
  selectedImageIndex = 0;
  constructor(
    private lightBox: Lightbox
  ) { }

  ngOnInit(): void {
    this.remappedImageLink = this.mediaList.map(e => {
      return {
        src: this.cdnBase + '/images/' + e.id_str + '.png',
      };
    });
  }

  open(index: number): void {
    // open lightbox
    this.lightBox.open(this.remappedImageLink, index);
  }

  close(): void {
    // close lightbox programmatically
    this.lightBox.close();
  }

}
