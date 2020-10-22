import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('target', {static: true}) target: ElementRef;
  // see options: https://github.com/videojs/video.js/blob/mastertutorial-options.html
  @Input() options: {
    fluid: boolean,
    autoplay: boolean,
    poster: string,
    sources: {
      src: string,
      type: string,
    }[],
  };
  player: videojs.Player;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    // instantiate Video.js
    this.player = videojs(this.target.nativeElement, this.options, function onPlayerReady(): void {
      console.log('onPlayerReady', this);
    });
  }

  ngOnDestroy(): void {
    // destroy player
    if (this.player) {
      this.player.dispose();
    }
  }

}
